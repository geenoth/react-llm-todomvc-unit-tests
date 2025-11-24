import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
  let mockOnSaveEdit;
  let mockOnBlur;

  beforeEach(() => {
    mockOnSaveEdit = jest.fn();
    mockOnBlur = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('edit');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).toHaveAttribute('id', 'edit-todo-input');
    expect(input).toHaveValue('');
    expect(input).toHaveFocus();
  });

  it('renders with defaultValue prop', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} defaultValue="Test todo" />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toHaveValue('Test todo');
  });

  it('renders label with correct attributes', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const label = screen.getByText('Edit Todo Input');
    expect(label).toHaveClass('visually-hidden');
    expect(label).toHaveAttribute('for', 'edit-todo-input');
  });

  it('calls onSaveEdit when Enter key is pressed with valid input', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'New todo item' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith('New todo item');
    expect(mockOnSaveEdit).toHaveBeenCalledTimes(1);
  });

  it('trims whitespace before saving', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: '  Trimmed todo  ' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith('Trimmed todo');
  });

  it('does not call onSaveEdit when input is less than 2 characters', () => {
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

  it('does not call onSaveEdit when non-Enter key is pressed', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'Valid input' } });
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' });
    
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
  });

  it('sanitizes special characters in input', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    const unsanitizedValue = '<script>alert("xss")</script> & "quotes" \'single\' /slash/';
    fireEvent.change(input, { target: { value: unsanitizedValue } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnSaveEdit).toHaveBeenCalledWith(
      '&lt;script&gt;alert(&quot;xss&quot;)&lt;&#x2F;script&gt; &amp; &quot;quotes&quot; &#x27;single&#x27; &#x2F;slash&#x2F;'
    );
  });

  it('calls onBlur when input loses focus', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} onBlur={mockOnBlur} />);
    
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.blur(input);
    
    expect(mockOnBlur).toHaveBeenCalledTimes(1);
  });

  it('does not throw error when onBlur is not provided', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const input = screen.getByTestId('edit-todo-input');
    expect(() => fireEvent.blur(input)).not.toThrow();
  });

  it('maintains callback reference stability', () => {
    const { rerender } = render(
      <EditTodoInput onSaveEdit={mockOnSaveEdit} onBlur={mockOnBlur} />
    );
    
    const input = screen.getByTestId('edit-todo-input');
    const initialKeyDownHandler = input.onkeydown;
    const initialBlurHandler = input.onblur;
    
    // Rerender with same props
    rerender(<EditTodoInput onSaveEdit={mockOnSaveEdit} onBlur={mockOnBlur} />);
    
    expect(input.onkeydown).toBe(initialKeyDownHandler);
    expect(input.onblur).toBe(initialBlurHandler);
  });

  it('updates callback reference when dependencies change', () => {
    const { rerender } = render(
      <EditTodoInput onSaveEdit={mockOnSaveEdit} onBlur={mockOnBlur} />
    );
    
    const input = screen.getByTestId('edit-todo-input');
    const initialKeyDownHandler = input.onkeydown;
    const initialBlurHandler = input.onblur;
    
    const newMockOnSaveEdit = jest.fn();
    const newMockOnBlur = jest.fn();
    
    rerender(<EditTodoInput onSaveEdit={newMockOnSaveEdit} onBlur={newMockOnBlur} />);
    
    expect(input.onkeydown).not.toBe(initialKeyDownHandler);
    expect(input.onblur).not.toBe(initialBlurHandler);
  });

  it('renders with correct container structure', () => {
    const { container } = render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    
    const inputContainer = container.querySelector('.input-container');
    expect(inputContainer).toBeInTheDocument();
    expect(inputContainer.querySelector('#edit-todo-input')).toBeInTheDocument();
    expect(inputContainer.querySelector('label')).toBeInTheDocument();
  });
});