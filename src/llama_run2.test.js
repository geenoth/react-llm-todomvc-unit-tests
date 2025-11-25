import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TodoList } from './05_TodoList';

describe('TodoList component', () => {
  const todos = [
    { id: 1, completed: false, title: 'Todo 1' },
    { id: 2, completed: true, title: 'Todo 2' },
  ];

  const renderItem = jest.fn((todo, index) => <span data-testid={`todo-item-content-${todo.id}`}>{todo.title}</span>);

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<TodoList todos={todos} renderItem={renderItem} />);
    expect(getByTestId('todo-list')).toBeInTheDocument();
  });

  it('renders todo items correctly', () => {
    const { getAllByTestId } = render(<TodoList todos={todos} renderItem={renderItem} />);
    const todoItems = getAllByTestId(/todo-item-/i);
    expect(todoItems.length).toBe(todos.length);
    todoItems.forEach((todoItem, index) => {
      expect(todoItem.className).toContain(todos[index].completed ? 'completed' : '');
    });
  });

  it('renders todo item contents correctly', () => {
    const { getAllByTestId } = render(<TodoList todos={todos} renderItem={renderItem} />);
    const todoItemContents = getAllByTestId(/todo-item-content-/i);
    expect(todoItemContents.length).toBe(todos.length);
    todoItemContents.forEach((todoItemContent, index) => {
      expect(todoItemContent.textContent).toBe(todos[index].title);
    });
  });

  it('calls renderItem for each todo item', () => {
    render(<TodoList todos={todos} renderItem={renderItem} />);
    expect(renderItem).toHaveBeenCalledTimes(todos.length);
  });
});