import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
  const mockOnToggle = jest.fn();
  const defaultProps = {
    completed: false,
    onToggle: mockOnToggle,
    todoId: '1',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders checkbox with correct initial state when not completed', () => {
    render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  test('renders checkbox with correct initial state when completed', () => {
    render(<TodoItemCheckbox {...defaultProps} completed={true} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toBeChecked();
  });

  test('calls onToggle with correct todoId when checkbox is clicked', () => {
    render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    fireEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith('1');
  });

  test('has correct aria-label based on completed state', () => {
    render(<TodoItemCheckbox {...defaultProps} completed={false} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).toHaveAttribute('aria-label', 'Mark todo 1 as complete');

    render(<TodoItemCheckbox {...defaultProps} completed={true} />);
    const updatedCheckbox = screen.getByTestId('todo-item-checkbox');
    expect(updatedCheckbox).toHaveAttribute('aria-label', 'Mark todo 1 as incomplete');
  });

  test('has correct className for styling', () => {
    render(<TodoItemCheckbox {...defaultProps} />);
    const checkbox = screen.getByTestId('todo-item-checkbox');
    expect(checkbox).toHaveClass('toggle');
  });

  test('does not call onToggle unnecessarily on render', () => {
    render(<TodoItemCheckbox {...defaultProps} />);
    expect(mockOnToggle).not.toHaveBeenCalled();
  });
});