import { render, screen, fireEvent } from '@testing-library/react';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  const mockOnDestroy = jest.fn();
  const todoId = '123';

  beforeEach(() => {
    mockOnDestroy.mockClear();
  });

  test('renders the destroy button with correct aria-label', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    const button = screen.getByTestId('destroy-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
    expect(button).toHaveClass('destroy');
  });

  test('calls onDestroy with correct todoId when clicked', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    const button = screen.getByTestId('destroy-button');
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledTimes(1);
    expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
  });

  test('does not call onDestroy when button is not clicked', () => {
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    expect(mockOnDestroy).not.toHaveBeenCalled();
  });

  test('button remains functional with different todoId prop', () => {
    const newTodoId = '456';
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={newTodoId} />);
    const button = screen.getByTestId('destroy-button');
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledTimes(1);
    expect(mockOnDestroy).toHaveBeenCalledWith(newTodoId);
  });
});