import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel component', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<TodoLabel title="Test Todo" />);
    expect(getByTestId('todo-label')).toBeInTheDocument();
    expect(getByTestId('todo-label')).toHaveTextContent('Test Todo');
  });

  it('calls onEdit callback on double click', () => {
    const onEditMock = jest.fn();
    const { getByTestId } = render(<TodoLabel title="Test Todo" onEdit={onEditMock} todoId="1" />);
    const label = getByTestId('todo-label');
    fireEvent.doubleClick(label);
    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith('1');
  });

  it('does not call onEdit callback when onEdit prop is not provided', () => {
    const { getByTestId } = render(<TodoLabel title="Test Todo" todoId="1" />);
    const label = getByTestId('todo-label');
    fireEvent.doubleClick(label);
    expect(onEdit).not.toBeCalled();
  });

  it('has correct role and tabIndex', () => {
    const { getByTestId } = render(<TodoLabel title="Test Todo" />);
    const label = getByTestId('todo-label');
    expect(label).toHaveAttribute('role', 'button');
    expect(label).toHaveAttribute('tabIndex', '0');
  });
});