import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
  test('renders the checkbox input element', () => {
    render(<TodoItemCheckbox onToggle={() => {}} todoId={1} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox.type).toBe('checkbox');
  });

  test('is unchecked when completed prop is false', () => {
    render(<TodoItemCheckbox completed={false} onToggle={() => {}} todoId={1} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('is unchecked by default when completed prop is not provided', () => {
    render(<TodoItemCheckbox onToggle={() => {}} todoId={1} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).not.toBeChecked();
  });

  test('is checked when completed prop is true', () => {
    render(<TodoItemCheckbox completed={true} onToggle={() => {}} todoId={1} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).toBeChecked();
  });

  test('calls onToggle with the correct todoId when clicked', () => {
    const mockOnToggle = jest.fn();
    const testTodoId = 123;
    render(<TodoItemCheckbox onToggle={mockOnToggle} todoId={testTodoId} />);
    
    const checkbox = screen.getByTestId('todo-item-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(testTodoId);
  });
  
  test('calls onToggle with a string todoId when clicked', () => {
    const mockOnToggle = jest.fn();
    const testTodoId = 'abc-123';
    render(<TodoItemCheckbox onToggle={mockOnToggle} todoId={testTodoId} />);
    
    const checkbox = screen.getByTestId('todo-item-checkbox');
    fireEvent.click(checkbox);
    
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(testTodoId);
  });

  test('has the correct aria-label when incomplete', () => {
    const testTodoId = 456;
    render(<TodoItemCheckbox completed={false} onToggle={() => {}} todoId={testTodoId} />);
    const expectedLabel = `Mark todo ${testTodoId} as complete`;
    const checkbox = screen.getByLabelText(expectedLabel);
    expect(checkbox).toBeInTheDocument();
  });

  test('has the correct aria-label when complete', () => {
    const testTodoId = 789;
    render(<TodoItemCheckbox completed={true} onToggle={() => {}} todoId={testTodoId} />);
    const expectedLabel = `Mark todo ${testTodoId} as incomplete`;
    const checkbox = screen.getByLabelText(expectedLabel);
    expect(checkbox).toBeInTheDocument();
  });

  test('re-renders correctly when props change', () => {
    const { rerender } = render(<TodoItemCheckbox completed={false} onToggle={() => {}} todoId={1} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    
    expect(checkbox).not.toBeChecked();
    
    rerender(<TodoItemCheckbox completed={true} onToggle={() => {}} todoId={1} />);
    
    expect(checkbox).toBeChecked();
  });
});