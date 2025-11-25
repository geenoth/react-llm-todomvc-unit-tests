import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { TodoList } from './05_TodoList';

describe('TodoList', () => {
  const renderItem = jest.fn((todo, index) => <div data-testid={`todo-item-content-${todo.id}`}>{todo.title}</div>);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders todo list with correct class name', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];

    const { getByTestId } = render(<TodoList todos={todos} renderItem={renderItem} />);
    expect(getByTestId('todo-list')).toBeInTheDocument();
    expect(getByTestId('todo-list')).toHaveClass('todo-list');
  });

  it('renders todo items with correct class names and content', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];

    const { getAllByTestId } = render(<TodoList todos={todos} renderItem={renderItem} />);
    const todoItems = getAllByTestId(/^todo-item-/);

    expect(todoItems.length).toBe(2);
    expect(todoItems[0]).toHaveClass('todo-list-item');
    expect(todoItems[0]).not.toHaveClass('completed');
    expect(todoItems[0].querySelector(`[data-testid="todo-item-content-${todos[0].id}"]`)).toBeInTheDocument();

    expect(todoItems[1]).toHaveClass('todo-list-item completed');
    expect(todoItems[1].querySelector(`[data-testid="todo-item-content-${todos[1].id}"]`)).toBeInTheDocument();
  });

  it('calls renderItem for each todo item', () => {
    const todos = [
      { id: 1, title: 'Todo 1', completed: false },
      { id: 2, title: 'Todo 2', completed: true },
    ];

    render(<TodoList todos={todos} renderItem={renderItem} />);

    expect(renderItem).toHaveBeenCalledTimes(2);
  });
});