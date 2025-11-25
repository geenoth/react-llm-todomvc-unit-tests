import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
  const onToggle = jest.fn();
  const todoId = 1;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} />);
    expect(getByTestId('todo-item-checkbox')).toBeInTheDocument();
  });

  it('is checked when completed prop is true', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} completed />);
    expect(getByTestId('todo-item-checkbox')).toBeChecked();
  });

  it('is not checked when completed prop is false', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} />);
    expect(getByTestId('todo-item-checkbox')).not.toBeChecked();
  });

  it('calls onToggle when checkbox is toggled', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} />);
    const checkbox = getByTestId('todo-item-checkbox');
    fireEvent.click(checkbox);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(todoId);
  });
});