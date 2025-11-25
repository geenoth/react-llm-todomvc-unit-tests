import { render, screen, fireEvent } from '@testing-library/react';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
  test('renders the button with correct text', () => {
    render(<ClearCompletedButton onClearCompleted={() => {}} />);
    const buttonElement = screen.getByTestId('clear-completed-button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Clear completed');
  });

  test('button is disabled when disabled prop is true', () => {
    render(<ClearCompletedButton onClearCompleted={() => {}} disabled={true} />);
    const buttonElement = screen.getByTestId('clear-completed-button');
    expect(buttonElement).toBeDisabled();
  });

  test('button is enabled when disabled prop is false', () => {
    render(<ClearCompletedButton onClearCompleted={() => {}} disabled={false} />);
    const buttonElement = screen.getByTestId('clear-completed-button');
    expect(buttonElement).not.toBeDisabled();
  });

  test('calls onClearCompleted when button is clicked', () => {
    const mockOnClearCompleted = jest.fn();
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    const buttonElement = screen.getByTestId('clear-completed-button');
    fireEvent.click(buttonElement);
    expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
  });

  test('does not call onClearCompleted when button is disabled and clicked', () => {
    const mockOnClearCompleted = jest.fn();
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
    const buttonElement = screen.getByTestId('clear-completed-button');
    fireEvent.click(buttonElement);
    expect(mockOnClearCompleted).not.toHaveBeenCalled();
  });

  test('button has correct class name', () => {
    render(<ClearCompletedButton onClearCompleted={() => {}} />);
    const buttonElement = screen.getByTestId('clear-completed-button');
    expect(buttonElement).toHaveClass('clear-completed');
  });
});