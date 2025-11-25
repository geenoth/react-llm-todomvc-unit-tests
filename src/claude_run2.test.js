/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
  const mockOnSaveEdit = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('edit');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('autoFocus');
    expect(input).toHaveValue('');
    
    const label = screen.getByLabelText('Edit Todo Input');
    expect(label).toBeInTheDocument();
  });

  test('renders with defaultValue', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} defaultValue="Test Todo" />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toHaveValue('Test Todo');
  });

  test('calls onSaveEdit when Enter is pressed with valid input', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.keyDown(input, { key: 'Enter', target: { value: 'New Todo Item' } });
    
    expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
    expect(mockOnSaveEdit).toHaveBeenCalledWith('New Todo Item');
  });

  test('sanitizes input before calling onSaveEdit', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.keyDown(input, { key: 'Enter', target: { value: '<script>alert("xss")</script>' } });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith('&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt;');
  });

  test('trims whitespace before validation', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.keyDown(input, { key: 'Enter', target: { value: '  Valid Todo  ' } });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith('Valid Todo');
  });

  test('does not call onSaveEdit when input is less than 2 characters', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    
    // Test with 1 character
    fireEvent.keyDown(input, { key: 'Enter', target: { value: 'a' } });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
    
    // Test with empty string
    fireEvent.keyDown(input, { key: 'Enter', target: { value: '' } });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
    
    // Test with only whitespace
    fireEvent.keyDown(input, { key: 'Enter', target: { value: '   ' } });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
  });

  test('does not call onSaveEdit when key pressed is not Enter', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'Valid Todo' } });
    
    fireEvent.keyDown(input, { key: 'Escape', target: { value: 'Valid Todo' } });
    fireEvent.keyDown(input, { key: 'Tab', target: { value: 'Valid Todo' } });
    fireEvent.keyDown(input, { key: 'a', target: { value: 'Valid Todo' } });
    
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
  });

  test('calls onBlur when input loses focus', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} onBlur={mockOnBlur} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.blur(input);
    
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  test('does not call onBlur when prop is not provided', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    
    // Should not throw error
    expect(() => {
      fireEvent.blur(input);
    }).not.toThrow();
  });

  test('sanitizes all special characters', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    const dangerousString = '&<>"\'/test';
    
    fireEvent.keyDown(input, { key: 'Enter', target: { value: dangerousString } });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith('&amp;&lt;&gt;&quot;&#x27;&#x2F;test');
  });

  test('has proper accessibility attributes', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    const label = screen.getByText('Edit Todo Input');
    
    expect(input).toHaveAttribute('id', 'edit-todo-input');
    expect(label).toHaveAttribute('for', 'edit-todo-input');
    expect(label).toHaveClass('visually-hidden');
  });
});