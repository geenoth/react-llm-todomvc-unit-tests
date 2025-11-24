import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe('AddTodoInput', () => {
  let mockOnAddTodo;

  beforeEach(() => {
    mockOnAddTodo = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default placeholder', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'What needs to be done?');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'add-todo-input');
    expect(input).toHaveClass('new-todo');
    expect(input).toHaveFocus();
  });

  test('renders with custom placeholder', () => {
    const customPlaceholder = 'Add a new task';
    render(<AddTodoInput onAddTodo={mockOnAddTodo} placeholder={customPlaceholder} />);
    
    const input = screen.getByTestId('add-todo-input');
    expect(input).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('renders label with correct attributes', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const label = screen.getByText('Add Todo Input');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('visually-hidden');
    expect(label).toHaveAttribute('for', 'add-todo-input');
  });

  test('renders container with correct class', () => {
    const { container } = render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const inputContainer = container.querySelector('.input-container');
    expect(inputContainer).toBeInTheDocument();
  });

  test('calls onAddTodo when Enter is pressed with valid input', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'New todo item' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
    expect(mockOnAddTodo).toHaveBeenCalledWith('New todo item');
    expect(input.value).toBe('');
  });

  test('trims whitespace before validating and submitting', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: '  Valid todo  ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('Valid todo');
  });

  test('does not call onAddTodo when input is too short (less than 2 characters)', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    
    // Test with 1 character
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnAddTodo).not.toHaveBeenCalled();
    
    // Test with empty string
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnAddTodo).not.toHaveBeenCalled();
    
    // Test with only spaces
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('does not call onAddTodo when key other than Enter is pressed', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'Valid todo' } });
    
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('sanitizes special characters in input', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    
    const testCases = [
      { input: '<script>alert("XSS")</script>', expected: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;' },
      { input: 'Test & "quotes"', expected: 'Test &amp; &quot;quotes&quot;' },
      { input: "Test's <tag>", expected: "Test&#x27;s &lt;tag&gt;" },
      { input: 'Test / slash', expected: 'Test &#x2F; slash' }
    ];
    
    testCases.forEach(({ input: testInput, expected }) => {
      fireEvent.change(input, { target: { value: testInput } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      
      expect(mockOnAddTodo).toHaveBeenCalledWith(expected);
      mockOnAddTodo.mockClear();
    });
  });

  test('clears input value after successful submission', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'Todo to be cleared' } });
    
    expect(input.value).toBe('Todo to be cleared');
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(input.value).toBe('');
  });

  test('does not clear input value when validation fails', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'a' } });
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(input.value).toBe('a');
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});