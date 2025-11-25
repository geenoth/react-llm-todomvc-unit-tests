import { render, screen } from '@testing-library/react';
import { TodoList } from './05_TodoList';

const mockRenderItem = jest.fn((todo, index) => (
  <span data-testid={`todo-content-${todo.id}`}>{todo.text}</span>
));

const defaultTodos = [
  { id: 1, text: 'First Todo', completed: false },
  { id: 2, text: 'Second Todo', completed: true },
];

describe('TodoList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the todo list with correct number of items', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(defaultTodos.length);
  });

  test('renders empty list when no todos are provided', () => {
    render(<TodoList todos={[]} renderItem={mockRenderItem} />);
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  test('applies correct className to the list', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    const todoList = screen.getByTestId('todo-list');
    expect(todoList).toHaveClass('todo-list');
  });

  test('renders each todo item with correct data-testid', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    defaultTodos.forEach(todo => {
      const todoItem = screen.getByTestId(`todo-item-${todo.id}`);
      expect(todoItem).toBeInTheDocument();
    });
  });

  test('applies completed class to completed todo items', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    const completedTodo = screen.getByTestId('todo-item-2');
    expect(completedTodo).toHaveClass('completed');
    const incompleteTodo = screen.getByTestId('todo-item-1');
    expect(incompleteTodo).not.toHaveClass('completed');
  });

  test('calls renderItem for each todo with correct arguments', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    expect(mockRenderItem).toHaveBeenCalledTimes(defaultTodos.length);
    defaultTodos.forEach((todo, index) => {
      expect(mockRenderItem).toHaveBeenCalledWith(todo, index);
    });
  });

  test('renders content from renderItem function', () => {
    render(<TodoList todos={defaultTodos} renderItem={mockRenderItem} />);
    defaultTodos.forEach(todo => {
      const todoContent = screen.getByTestId(`todo-content-${todo.id}`);
      expect(todoContent).toHaveTextContent(todo.text);
    });
  });
});