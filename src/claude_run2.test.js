import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from './05_TodoList';

describe('TodoList', () => {
  const mockRenderItem = jest.fn((todo, index) => (
    <div data-testid={`mock-content-${todo.id}`}>
      {todo.text} - {index}
    </div>
  ));

  beforeEach(() => {
    mockRenderItem.mockClear();
  });

  test('renders empty list when no todos provided', () => {
    render(<TodoList renderItem={mockRenderItem} />);
    
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(todoList).toHaveClass('todo-list');
    expect(todoList.children).toHaveLength(0);
    expect(mockRenderItem).not.toHaveBeenCalled();
  });

  test('renders empty list when todos is empty array', () => {
    render(<TodoList todos={[]} renderItem={mockRenderItem} />);
    
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(todoList.children).toHaveLength(0);
    expect(mockRenderItem).not.toHaveBeenCalled();
  });

  test('renders todos correctly', () => {
    const todos = [
      { id: 1, text: 'First todo', completed: false },
      { id: 2, text: 'Second todo', completed: true },
      { id: 3, text: 'Third todo', completed: false }
    ];

    render(<TodoList todos={todos} renderItem={mockRenderItem} />);
    
    const todoList = screen.getByTestId('todo-list');
    expect(todoList.children).toHaveLength(3);

    todos.forEach((todo, index) => {
      const todoItem = screen.getByTestId(`todo-item-${todo.id}`);
      expect(todoItem).toBeInTheDocument();
      expect(mockRenderItem).toHaveBeenCalledWith(todo, index);
    });

    expect(mockRenderItem).toHaveBeenCalledTimes(3);
  });

  test('applies completed class to completed todos', () => {
    const todos = [
      { id: 1, text: 'Incomplete todo', completed: false },
      { id: 2, text: 'Completed todo', completed: true }
    ];

    render(<TodoList todos={todos} renderItem={mockRenderItem} />);
    
    const incompleteTodo = screen.getByTestId('todo-item-1');
    const completedTodo = screen.getByTestId('todo-item-2');

    expect(incompleteTodo).not.toHaveClass('completed');
    expect(completedTodo).toHaveClass('completed');
  });

  test('renders content from renderItem prop', () => {
    const todos = [
      { id: 1, text: 'First todo', completed: false },
      { id: 2, text: 'Second todo', completed: true }
    ];

    render(<TodoList todos={todos} renderItem={mockRenderItem} />);
    
    expect(screen.getByTestId('mock-content-1')).toHaveTextContent('First todo - 0');
    expect(screen.getByTestId('mock-content-2')).toHaveTextContent('Second todo - 1');
  });

  test('uses todo.id as key', () => {
    const todos = [
      { id: 'unique-id-1', text: 'First', completed: false },
      { id: 'unique-id-2', text: 'Second', completed: false }
    ];

    const { rerender } = render(<TodoList todos={todos} renderItem={mockRenderItem} />);
    
    expect(screen.getByTestId('todo-item-unique-id-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-unique-id-2')).toBeInTheDocument();

    // Reorder todos to verify key usage
    const reorderedTodos = [todos[1], todos[0]];
    rerender(<TodoList todos={reorderedTodos} renderItem={mockRenderItem} />);

    const firstItem = screen.getByTestId('todo-item-unique-id-2');
    const secondItem = screen.getByTestId('todo-item-unique-id-1');

    expect(firstItem).toBeInTheDocument();
    expect(secondItem).toBeInTheDocument();
  });

  test('handles todos with various data types', () => {
    const todos = [
      { id: 1, text: 'Number ID', completed: false },
      { id: '2', text: 'String ID', completed: true },
      { id: 'complex-id-123', text: 'Complex ID', completed: false }
    ];

    render(<TodoList todos={todos} renderItem={mockRenderItem} />);
    
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-complex-id-123')).toBeInTheDocument();
  });

  test('renders when renderItem returns different content types', () => {
    const customRenderItem = (todo) => {
      if (todo.id === 1) return <span>Simple text</span>;
      if (todo.id === 2) return <div><button>Complex content</button></div>;
      return null;
    };

    const todos = [
      { id: 1, completed: false },
      { id: 2, completed: true },
      { id: 3, completed: false }
    ];

    render(<TodoList todos={todos} renderItem={customRenderItem} />);
    
    expect(screen.getByText('Simple text')).toBeInTheDocument();
    expect(screen.getByText('Complex content')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-3')).toBeEmptyDOMElement();
  });
});