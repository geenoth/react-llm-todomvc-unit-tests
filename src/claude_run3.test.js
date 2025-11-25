import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
  const mockOnToggle = jest.fn();
  const defaultProps = {
    completed: false,
    onToggle: mockOnToggle,
    todoId: 'test-todo-123'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders checkbox with correct initial state when uncompleted', () => {
    const { getByTestId } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveAttribute('type', 'checkbox');
    expect(checkbox).not.toBeChecked();
    expect(checkbox).toHaveClass('toggle');
    expect(checkbox).toHaveAttribute('aria-label', 'Mark todo test-todo-123 as complete');
  });

  test('renders checkbox with correct initial state when completed', () => {
    const { getByTestId } = render(
      <TodoItemCheckbox {...defaultProps} completed={true} />
    );
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).toBeChecked();
    expect(checkbox).toHaveAttribute('aria-label', 'Mark todo test-todo-123 as incomplete');
  });

  test('renders with default completed value when not provided', () => {
    const { getByTestId } = render(
      <TodoItemCheckbox onToggle={mockOnToggle} todoId="test-id" />
    );
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).not.toBeChecked();
  });

  test('calls onToggle with todoId when checkbox is clicked', () => {
    const { getByTestId } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith('test-todo-123');
  });

  test('calls onToggle when onChange event is triggered', () => {
    const { getByTestId } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.change(checkbox, { target: { checked: true } });
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith('test-todo-123');
  });

  test('updates callback when props change', () => {
    const { getByTestId, rerender } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledWith('test-todo-123');
    
    const newMockOnToggle = jest.fn();
    rerender(
      <TodoItemCheckbox
        completed={false}
        onToggle={newMockOnToggle}
        todoId="new-todo-456"
      />
    );
    
    fireEvent.click(checkbox);
    expect(newMockOnToggle).toHaveBeenCalledWith('new-todo-456');
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
  });

  test('maintains controlled behavior with different completed states', () => {
    const { getByTestId, rerender } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    expect(checkbox).not.toBeChecked();
    
    rerender(<TodoItemCheckbox {...defaultProps} completed={true} />);
    expect(checkbox).toBeChecked();
    
    rerender(<TodoItemCheckbox {...defaultProps} completed={false} />);
    expect(checkbox).not.toBeChecked();
  });

  test('handles multiple rapid clicks correctly', () => {
    const { getByTestId } = render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = getByTestId('todo-item-checkbox');
    
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(3);
    expect(mockOnToggle).toHaveBeenCalledWith('test-todo-123');
  });

  test('renders with different todoId values', () => {
    const differentTodoIds = ['todo-1', 'todo-2', 'special-!@#$%^&*()'];
    
    differentTodoIds.forEach(todoId => {
      const { getByTestId, unmount } = render(
        <TodoItemCheckbox
          completed={false}
          onToggle={mockOnToggle}
          todoId={todoId}
        />
      );
      
      const checkbox = getByTestId('todo-item-checkbox');
      expect(checkbox).toHaveAttribute('aria-label', `Mark todo ${todoId} as complete`);
      
      fireEvent.click(checkbox);
      expect(mockOnToggle).toHaveBeenLastCalledWith(todoId);
      
      unmount();
    });
  });
});