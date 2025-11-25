import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  const mockOnDestroy = jest.fn();
  const todoId = 'todo-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders destroy button with correct attributes', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    
    const button = screen.getByTestId('destroy-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('destroy');
    expect(button).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
  });

  test('calls onDestroy with todoId when button is clicked', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    
    const button = screen.getByTestId('destroy-button');
    fireEvent.click(button);
    
    expect(mockOnDestroy).toHaveBeenCalledTimes(1);
    expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
  });

  test('updates callback when props change', () => {
    const { rerender } = render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    
    const button = screen.getByTestId('destroy-button');
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
    
    const newMockOnDestroy = jest.fn();
    const newTodoId = 'todo-456';
    
    rerender(<DestroyButton onDestroy={newMockOnDestroy} todoId={newTodoId} />);
    
    fireEvent.click(button);
    expect(newMockOnDestroy).toHaveBeenCalledWith(newTodoId);
    expect(mockOnDestroy).toHaveBeenCalledTimes(1);
  });

  test('handles multiple clicks', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    
    const button = screen.getByTestId('destroy-button');
    
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(mockOnDestroy).toHaveBeenCalledTimes(3);
    expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
  });

  test('renders with different todoId values', () => {
    const specialTodoId = 'special-todo-999';
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={specialTodoId} />);
    
    const button = screen.getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', `Delete todo ${specialTodoId}`);
    
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith(specialTodoId);
  });

  test('handles undefined todoId', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={undefined} />);
    
    const button = screen.getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', 'Delete todo undefined');
    
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith(undefined);
  });

  test('handles null todoId', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={null} />);
    
    const button = screen.getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', 'Delete todo null');
    
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith(null);
  });

  test('handles numeric todoId', () => {
    const numericTodoId = 123;
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={numericTodoId} />);
    
    const button = screen.getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', `Delete todo ${numericTodoId}`);
    
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith(numericTodoId);
  });

  test('button is accessible via keyboard', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    
    const button = screen.getByTestId('destroy-button');
    button.focus();
    
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    fireEvent.keyUp(button, { key: 'Enter', code: 'Enter' });
    
    expect(mockOnDestroy).toHaveBeenCalledTimes(0);
  });
});