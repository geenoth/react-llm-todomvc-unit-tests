import { render, screen, fireEvent } from '@testing-library/react';
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe('AddTodoInput Component', () => {
  const mockOnAddTodo = jest.fn();

  beforeEach(() => {
    mockOnAddTodo.mockClear();
  });

  test('renders input field with correct placeholder', () => {
    const customPlaceholder = 'Enter a task';
    render(<AddTodoInput onAddTodo={mockOnAddTodo} placeholder={customPlaceholder} />);
    
    const inputElement = screen.getByTestId('add-todo-input');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', customPlaceholder);
  });

  test('renders input field with default placeholder when none provided', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const inputElement = screen.getByTestId('add-todo-input');
    expect(inputElement).toHaveAttribute('placeholder', 'What needs to be done?');
  });

  test('input field has autofocus', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const inputElement = screen.getByTestId('add-todo-input');
    expect(inputElement).toHaveFocus();
  });

  test('calls onAddTodo with sanitized value on Enter key press with valid input', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const inputElement = screen.getByTestId('add-todo-input');
    fireEvent.change(inputElement, { target: { value: 'Test & Todo' } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    
    expect(mockOnAddTodo).toHaveBeenCalledWith('Test &amp; Todo');
    expect(inputElement).toHaveValue('');
  });

  test('does not call onAddTodo on Enter key press with input less than 2 characters', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const inputElement = screen.getByTestId('add-todo-input');
    fireEvent.change(inputElement, { target: { value: 'T' } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
    expect(inputElement).toHaveValue('T');
  });

  test('does not call onAddTodo on Enter key press with empty input after trim', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const inputElement = screen.getByTestId('add-todo-input');
    fireEvent.change(inputElement, { target: { value: '   ' } });
    fireEvent.keyDown(inputElement, { key: 'Enter' });
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
    expect(inputElement).toHaveValue('   ');
  });

  test('does not call onAddTodo on other key presses', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const inputElement = screen.getByTestId('add-todo-input');
    fireEvent.change(inputElement, { target: { value: 'Test Todo' } });
    fireEvent.keyDown(inputElement, { key: 'ArrowDown' });
    
    expect(mockOnAddTodo).not.toHaveBeenCalled();
    expect(inputElement).toHaveValue('Test Todo');
  });

  test('renders visually hidden label for accessibility', () => {
    render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
    
    const labelElement = screen.getByLabelText('Add Todo Input');
    expect(labelElement).toBeInTheDocument();
  });
});