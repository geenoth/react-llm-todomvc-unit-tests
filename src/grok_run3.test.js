import { render, screen, fireEvent } from '@testing-library/react';
import { EditTodoInput } from './02_EditTodoInput';

describe('EditTodoInput', () => {
  const mockOnSaveEdit = jest.fn();
  const mockOnBlur = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input with default value', () => {
    const defaultValue = 'Test Todo';
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} defaultValue={defaultValue} />);
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(defaultValue);
  });

  test('input has autofocus', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    const input = screen.getByTestId('edit-todo-input');
    expect(input).toHaveFocus();
  });

  test('calls onSaveEdit with sanitized value on Enter key press when input is valid', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'Test <script>' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSaveEdit).toHaveBeenCalledWith('Test &lt;script&gt;');
  });

  test('does not call onSaveEdit on Enter key press when input is too short', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'T' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
  });

  test('does not call onSaveEdit on Enter key press when input is empty', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockOnSaveEdit).not.toHaveBeenCalled();
  });

  test('calls onBlur when input loses focus', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} onBlur={mockOnBlur} />);
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.blur(input);
    expect(mockOnBlur).toHaveBeenCalled();
  });

  test('does not call onBlur when onBlur prop is not provided', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.blur(input);
    // No error should be thrown, and no call to undefined function
    expect(mockOnBlur).not.toHaveBeenCalled();
  });

  test('handles input change correctly', () => {
    render(<EditTodoInput onSaveEdit={mockOnSaveEdit} />);
    const input = screen.getByTestId('edit-todo-input');
    fireEvent.change(input, { target: { value: 'New Todo' } });
    expect(input).toHaveValue('New Todo');
  });
});