import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel component', () => {
  const title = 'Todo title';
  const todoId = 1;
  const onEdit = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<TodoLabel title={title} onEdit={onEdit} todoId={todoId} />);
    expect(getByTestId('todo-label')).toBeInTheDocument();
  });

  it('renders title correctly', () => {
    const { getByTestId } = render(<TodoLabel title={title} onEdit={onEdit} todoId={todoId} />);
    expect(getByTestId('todo-label').textContent).toBe(title);
  });

  it('calls onEdit when double clicked', () => {
    const { getByTestId } = render(<TodoLabel title={title} onEdit={onEdit} todoId={todoId} />);
    const label = getByTestId('todo-label');
    fireEvent.doubleClick(label);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(todoId);
  });

  it('does not call onEdit when not double clicked', () => {
    const { getByTestId } = render(<TodoLabel title={title} onEdit={onEdit} todoId={todoId} />);
    const label = getByTestId('todo-label');
    fireEvent.click(label);
    expect(onEdit).not.toHaveBeenCalled();
  });
});