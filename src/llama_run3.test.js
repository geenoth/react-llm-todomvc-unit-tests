import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel', () => {
  const todoId = 1;
  const title = 'My Todo';
  const onEdit = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<TodoLabel title={title} onEdit={onEdit} todoId={todoId} />);
    expect(getByTestId('todo-label')).toBeInTheDocument();
    expect(getByTestId('todo-label')).toHaveTextContent(title);
  });

  it('calls onEdit when double clicked', () => {
    const { getByTestId } = render(<TodoLabel title={title} onEdit={onEdit} todoId={todoId} />);
    const label = getByTestId('todo-label');
    fireEvent.doubleClick(label);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(todoId);
  });

  it('has role button and is focusable', () => {
    const { getByTestId } = render(<TodoLabel title={title} onEdit={onEdit} todoId={todoId} />);
    const label = getByTestId('todo-label');
    expect(label).toHaveAttribute('role', 'button');
    expect(label).toHaveAttribute('tabIndex', '0');
  });
});