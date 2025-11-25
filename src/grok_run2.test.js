import { render, screen } from '@testing-library/react';
import { TodoList } from './05_TodoList';

describe('TodoList Component', () => {
  const mockRenderItem = jest.fn((todo, index) => (
    <span data-testid={`todo-content-${todo.id}`}>{todo.text}</span>
  ));

  const defaultTodos = [
    { id: 1, text: 'First Todo', completed: false },
    { id: 2, text: 'Second Todo', completed: true },
  ];

  beforeEach(() => {
    mockRenderItem.mockClear();
  });

  test('renders todo list with correct class', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(todoList).toHaveClass('todo-list');
  });

  test('renders correct number of todo items', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    expect(screen.getByTestId('todo-item-1')).toBeInTheDocument();
    expect(screen.getByTestId('todo-item-2')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(2);
  });

  test('applies completed class to completed todos', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    const completedItem = screen.getByTestId('todo-item-2');
    expect(completedItem).toHaveClass('completed');
    const incompleteItem = screen.getByTestId('todo-item-1');
    expect(incompleteItem).not.toHaveClass('completed');
  });

  test('calls renderItem for each todo with correct arguments', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    expect(mockRenderItem).toHaveBeenCalledTimes(2);
    expect(mockRenderItem).toHaveBeenCalledWith(defaultTodos[0], 0);
    expect(mockRenderItem).toHaveBeenCalledWith(defaultTodos[1], 1);
  });

  test('renders empty list when todos array is empty', () => {
    render(<TodoList todos={[]} renderItem={mockRenderItem} />);
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(screen.getAllByRole('listitem').length).toBe(0);
    expect(mockRenderItem).not.toHaveBeenCalled();
  });

  test('renders todo content correctly via renderItem', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    expect(screen.getByTestId('todo-content-1')).toHaveTextContent('First Todo');
    expect(screen.getByTestId('todo-content-2')).toHaveTextContent('Second Todo');
  });
});