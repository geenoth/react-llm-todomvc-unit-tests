import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoList } from './05_TodoList';

describe('TodoList', () => {
  const todos = [
    { id: 1, completed: false, title: 'Todo 1' },
    { id: 2, completed: true, title: 'Todo 2' },
  ];

  const renderItem = jest.fn((todo, index) => <span>{todo.title}</span>);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<TodoList todos={todos} renderItem={renderItem} />);
    expect(getByTestId('todo-list')).toBeInTheDocument();
    expect(getByTestId(`todo-item-${todos[0].id}`)).toBeInTheDocument();
    expect(getByTestId(`todo-item-${todos[1].id}`)).toBeInTheDocument();
  });

  it('renders todo items with correct classes', () => {
    const { getByTestId } = render(<TodoList todos={todos} renderItem={renderItem} />);
    expect(getByTestId(`todo-item-${todos[0].id}`)).not.toHaveClass('completed');
    expect(getByTestId(`todo-item-${todos[1].id}`)).toHaveClass('completed');
  });

  it('calls renderItem for each todo item', () => {
    render(<TodoList todos={todos} renderItem={renderItem} />);
    expect(renderItem).toHaveBeenCalledTimes(2);
  });
});