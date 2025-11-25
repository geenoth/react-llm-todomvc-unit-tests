import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
  const mockOnSaveEdit = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('autoFocus');
    expect(input).toHaveValue('');
  });

  test('renders with defaultValue', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} defaultValue="Test Todo" />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toHaveValue('Test Todo');
  });

  test('renders label with correct text', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const label = screen.getByText('Edit Todo Input');
    expect(label).toBeInTheDocument();
    expect(label).toHaveClass('visually-hidden');
  });

  test('calls onSaveEdit with sanitized value when Enter is pressed with valid input', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith('New Todo Item');
    expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
  });

  test('trims whitespace before saving', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: '  Trimmed Todo  ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith('Trimmed Todo');
  });

  test('does not call onSaveEdit when value is less than 2 characters', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    
    // Test with 1 character
    fireEvent.change(input, { target: { value: 'a' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
    
    // Test with empty string
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
    
    // Test with only spaces
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
  });

  test('does not call onSaveEdit when non-Enter key is pressed', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'Valid Todo' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
  });

  test('sanitizes HTML characters in input', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    
    const testCases = [
      { input: '<script>alert("XSS")</script>', expected: '&lt;script&gt;alert(&quot;XSS&quot;)&lt;&#x2F;script&gt;' },
      { input: 'Test & Co.', expected: 'Test &amp; Co.' },
      { input: "It's working", expected: 'It&#x27;s working' },
      { input: 'a > b < c', expected: 'a &gt; b &lt; c' },
      { input: 'path/to/file', expected: 'path&#x2F;to&#x2F;file' }
    ];
    
    testCases.forEach(({ input: testInput, expected }) => {
      fireEvent.change(input, { target: { value: testInput } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
      
      expect(mockOnSaveEdit).toHaveBeenCalledWith(expected);
      mockOnSaveEdit.mockClear();
    });
  });

  test('calls onBlur when input loses focus', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} onBlur={mockOnBlur} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.blur(input);
    
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  test('does not throw error when onBlur is not provided', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    
    expect(() => {
      fireEvent.blur(input);
    }).not.toThrow();
  });

  test('input has correct className', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toHaveClass('edit');
  });

  test('input has correct id', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toHaveAttribute('id', 'edit-todo-input');
  });

  test('container has correct className', () => {
    const { container } = render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const inputContainer = container.querySelector('.input-container');
    expect(inputContainer).toBeInTheDocument();
  });

  test('label is associated with input', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const label = screen.getByText('Edit Todo Input');
    expect(label).toHaveAttribute('for', 'edit-todo-input');
  });
});