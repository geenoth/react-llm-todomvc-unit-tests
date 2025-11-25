import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
  const onToggle = jest.fn();
  const todoId = 1;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders checkbox with correct class name', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} />);
    expect(getByTestId('todo-item-checkbox')).toBeInTheDocument();
    expect(getByTestId('todo-item-checkbox')).toHaveClass('toggle');
  });

  it('renders checkbox with correct aria-label', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} />);
    expect(getByTestId('todo-item-checkbox')).toHaveAttribute('aria-label', `Mark todo ${todoId} as incomplete`);
  });

  it('calls onToggle on checkbox change', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} />);

    fireEvent.change(getByTestId('todo-item-checkbox'));

    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(onToggle).toHaveBeenCalledWith(todoId);
  });

  it('renders checkbox as checked when completed prop is true', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} completed={true} />);
    expect(getByTestId('todo-item-checkbox')).toBeChecked();
  });

  it('renders checkbox as unchecked when completed prop is false', () => {
    const { getByTestId } = render(<TodoItemCheckbox onToggle={onToggle} todoId={todoId} completed={false} />);
    expect(getByTestId('todo-item-checkbox')).not.toBeChecked();
  });
});