import { render, screen } from '@testing-library/react';
import { TodoList } from './05_TodoList';

const mockRenderItem = jest.fn((todo, index) => <span>{todo.text}</span>);
const defaultTodos = [
  { id: 1, text: 'First Todo', completed: false },
  { id: 2, text: 'Second Todo', completed: true },
];

describe('TodoList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders todo list with provided todos', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(todoList.tagName).toBe('UL');
    expect(todoList).toHaveClass('todo-list');
    
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(mockRenderItem).toHaveBeenCalledTimes(2);
  });

  test('renders empty list when no todos are provided', () => {
    render(<TodoList todos={[]} renderItem={mockRenderItem} />);
    
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(todoList.children.length).toBe(0);
    expect(mockRenderItem).not.toHaveBeenCalled();
  });

  test('applies completed class to completed todo items', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    
    const completedItem = screen.getByTestId('todo-item-2');
    expect(completedItem).toHaveClass('completed');
    
    const incompleteItem = screen.getByTestId('todo-item-1');
    expect(incompleteItem).not.toHaveClass('completed');
  });

  test('calls renderItem with correct arguments for each todo', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    
    expect(mockRenderItem).toHaveBeenCalledWith(defaultTodos[0], 0);
    expect(mockRenderItem).toHaveBeenCalledWith(defaultTodos[1], 1);
  });

  test('uses unique key for each list item', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    
    const firstItem = screen.getByTestId('todo-item-1');
    const secondItem = screen.getByTestId('todo-item-2');
    expect(firstItem).toHaveAttribute('data-testid', 'todo-item-1');
    expect(secondItem).toHaveAttribute('data-testid', 'todo-item-2');
  });
});