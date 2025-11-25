import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from './05_TodoList';

describe('TodoList', () => {
  const mockRenderItem = jest.fn((todo, index) => (
    <div>
      {todo.text} - Index: {index}
    </div>
  ));

  const mockTodos = [
    { id: '1', text: 'Buy groceries', completed: false },
    { id: '2', text: 'Walk the dog', completed: true },
    { id: '3', text: 'Read a book', completed: false },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders empty list when no todos provided', () => {
    const { getByTestId } = render(<TodoList renderItem={mockRenderItem} />);
    const todoList = getByTestId('todo-list');
    
    expect(todoList).toBeInTheDocument();
    expect(todoList).toHaveClass('todo-list');
    expect(todoList.children).toHaveLength(0);
  });

  test('renders empty list when todos is empty array', () => {
    const { getByTestId } = render(<TodoList todos={[]} renderItem={mockRenderItem} />);
    const todoList = getByTestId('todo-list');
    
    expect(todoList).toBeInTheDocument();
    expect(todoList.children).toHaveLength(0);
  });

  test('renders all todos', () => {
    const { getByTestId } = render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
    const todoList = getByTestId('todo-list');
    
    expect(todoList.children).toHaveLength(3);
    
    mockTodos.forEach((todo) => {
      const todoItem = getByTestId(`todo-item-${todo.id}`);
      expect(todoItem).toBeInTheDocument();
    });
  });

  test('calls renderItem for each todo with correct arguments', () => {
    render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
    
    expect(mockRenderItem).toHaveBeenCalledTimes(3);
    expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[0], 0);
    expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[1], 1);
    expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[2], 2);
  });

  test('renders renderItem content correctly', () => {
    const { getByTestId, getByText } = render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
    
    expect(getByText('Buy groceries - Index: 0')).toBeInTheDocument();
    expect(getByText('Walk the dog - Index: 1')).toBeInTheDocument();
    expect(getByText('Read a book - Index: 2')).toBeInTheDocument();
  });

  test('applies completed class to completed todos', () => {
    const { getByTestId } = render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
    
    const todo1 = getByTestId('todo-item-1');
    const todo2 = getByTestId('todo-item-2');
    const todo3 = getByTestId('todo-item-3');
    
    expect(todo1).not.toHaveClass('completed');
    expect(todo2).toHaveClass('completed');
    expect(todo3).not.toHaveClass('completed');
  });

  test('renders with different renderItem implementations', () => {
    const customRenderItem = jest.fn((todo) => (
      <span>{todo.text.toUpperCase()}</span>
    ));
    
    const { getByText } = render(<TodoList todos={mockTodos} renderItem={customRenderItem} />);
    
    expect(getByText('BUY GROCERIES')).toBeInTheDocument();
    expect(getByText('WALK THE DOG')).toBeInTheDocument();
    expect(getByText('READ A BOOK')).toBeInTheDocument();
  });

  test('handles todos with different id types', () => {
    const todosWithDifferentIds = [
      { id: 123, text: 'Numeric ID', completed: false },
      { id: 'string-id', text: 'String ID', completed: true },
    ];
    
    const { getByTestId } = render(<TodoList todos={todosWithDifferentIds} renderItem={mockRenderItem} />);
    
    expect(getByTestId('todo-item-123')).toBeInTheDocument();
    expect(getByTestId('todo-item-string-id')).toBeInTheDocument();
  });

  test('re-renders when todos prop changes', () => {
    const { rerender, getByTestId, queryByTestId } = render(
      <TodoList todos={mockTodos} renderItem={mockRenderItem} />
    );
    
    expect(getByTestId('todo-list').children).toHaveLength(3);
    
    const newTodos = [
      { id: '4', text: 'New todo', completed: false },
    ];
    
    rerender(<TodoList todos={newTodos} renderItem={mockRenderItem} />);
    
    expect(getByTestId('todo-list').children).toHaveLength(1);
    expect(queryByTestId('todo-item-1')).not.toBeInTheDocument();
    expect(getByTestId('todo-item-4')).toBeInTheDocument();
  });

  test('maintains correct order of todos', () => {
    const { getAllByRole } = render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
    const listItems = getAllByRole('listitem');
    
    expect(listItems[0]).toHaveAttribute('data-testid', 'todo-item-1');
    expect(listItems[1]).toHaveAttribute('data-testid', 'todo-item-2');
    expect(listItems[2]).toHaveAttribute('data-testid', 'todo-item-3');
  });

  test('handles renderItem that returns null', () => {
    const nullRenderItem = jest.fn(() => null);
    const { getByTestId } = render(<TodoList todos={mockTodos} renderItem={nullRenderItem} />);
    
    const todoList = getByTestId('todo-list');
    expect(todoList.children).toHaveLength(3);
    
    mockTodos.forEach((todo) => {
      const todoItem = getByTestId(`todo-item-${todo.id}`);
      expect(todoItem).toBeInTheDocument();
      expect(todoItem).toBeEmptyDOMElement();
    });
  });
});