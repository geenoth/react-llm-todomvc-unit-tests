import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe('AddTodoInput', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  test('renders input with default placeholder', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'What needs to be done?');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'add-todo-input');
    expect(input).toHaveAttribute('autofocus');
  });

  test('renders input with custom placeholder', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} placeholder="Custom placeholder" />);
    
    const input = screen.getByTestId('add-todo-input');
    expect(input).toHaveAttribute('placeholder', 'Custom placeholder');
  });

  test('renders label for accessibility', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const label = screen.getByText('Add Todo Input');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'add-todo-input');
    expect(label).toHaveClass('visually-hidden');
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

  test('trims whitespace from input value', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: '  Trimmed todo  ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('Trimmed todo');
  });

  test('does not call onAddTodo when input is less than 2 characters', () => {
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

  test('does not call onAddTodo when non-Enter key is pressed', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'Valid todo' } });
    
    // Test various other keys
    fireEvent.keyDown(input, { key: 'a', code: 'KeyA' });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' });
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('sanitizes HTML characters in input', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    
    // Test various HTML characters
    const testCases = [
      { input: '<script>alert("XSS")</script>', expected: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;' },
      { input: 'Test & sanitize', expected: 'Test &amp; sanitize' },
      { input: 'Test < and >', expected: 'Test &lt; and &gt;' },
      { input: 'Test "quotes" and \'single\'', expected: 'Test &quot;quotes&quot; and &#x27;single&#x27;' },
      { input: 'Test/slash', expected: 'Test&#x2F;slash' }
    ];
    
    testCases.forEach(({ input: testInput, expected }) => {
      fireEvent.change(input, { target: { value: testInput } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      expect(mockOnAddTodo).toHaveBeenLastCalledWith(expected);
      mockOnAddTodo.mockClear();
    });
  });

  test('clears input after successful submission', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'Todo to clear' } });
    expect(input.value).toBe('Todo to clear');
    
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(input.value).toBe('');
  });

  test('does not clear input when submission fails (less than 2 chars)', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(input.value).toBe('a');
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });

  test('maintains input value when typing without pressing Enter', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const input = screen.getByTestId('add-todo-input');
    fireEvent.change(input, { target: { value: 'Typing in progress' } });
    
    expect(input.value).toBe('Typing in progress');
    expect(mockOnAddTodo).not.toHaveBeenCalled();
  });
});