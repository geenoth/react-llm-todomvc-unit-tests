import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
  const defaultProps = {
    completed: false,
    onToggle: jest.fn(),
    todoId: 'test-todo-123'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders checkbox with correct initial state when uncompleted', () => {
    const { getByTestId } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass('toggle');
    expect(checkbox).toHaveAttribute('aria-label', 'Mark todo test-todo-123 as complete');
  });

  it('renders checkbox with correct initial state when completed', () => {
    const { getByTestId } = render(
      <TodoItemCheckbox {...defaultProps} completed={true} />
    );
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('aria-label', 'Mark todo test-todo-123 as incomplete');
  });

  it('calls onToggle with todoId when checkbox is clicked', () => {
    const { getByTestId } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.click(checkbox);
    
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggle).toHaveBeenCalledWith('test-todo-123');
  });

  it('calls onToggle when onChange event is triggered', () => {
    const { getByTestId } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.change(checkbox, { target: { checked: true } });
    
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
    expect(defaultProps.onToggle).toHaveBeenCalledWith('test-todo-123');
  });

  it('handles default completed prop value', () => {
    const { getByTestId } = render(
      <TodoItemCheckbox onToggle={defaultProps.onToggle} todoId={defaultProps.todoId} />
    );
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).not.toBeChecked();
  });

  it('memoizes handleChange callback', () => {
    const { getByTestId, rerender } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.click(checkbox);
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
    
    // Re-render with same props
    rerender(<TodoItemCheckbox {...defaultProps} />);
    fireEvent.click(checkbox);
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(2);
  });

  it('updates callback when todoId changes', () => {
    const { getByTestId, rerender } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.click(checkbox);
    expect(defaultProps.onToggle).toHaveBeenCalledWith('test-todo-123');
    
    const newTodoId = 'new-todo-456';
    rerender(<TodoItemCheckbox {...defaultProps} todoId={newTodoId} />);
    fireEvent.click(checkbox);
    expect(defaultProps.onToggle).toHaveBeenCalledWith(newTodoId);
  });

  it('updates callback when onToggle function changes', () => {
    const { getByTestId, rerender } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.click(checkbox);
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
    
    const newOnToggle = jest.fn();
    rerender(<TodoItemCheckbox {...defaultProps} onToggle={newOnToggle} />);
    fireEvent.click(checkbox);
    expect(newOnToggle).toHaveBeenCalledTimes(1);
    expect(newOnToggle).toHaveBeenCalledWith('test-todo-123');
  });

  it('maintains controlled behavior', () => {
    const { getByTestId, rerender } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).not.toBeChecked();
    
    // Clicking doesn't change the checked state directly
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    
    // Parent controls the state
    rerender(<TodoItemCheckbox {...defaultProps} completed={true} />);
    expect(checkbox).toBeChecked();
  });
});