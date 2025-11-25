import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
  const mockOnClearCompleted = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with correct text', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    
    const button = screen.getByTestId('clear-completed-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Clear completed');
  });

  test('renders with correct class name', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    
    const button = screen.getByTestId('clear-completed-button');
    expect(button).toHaveClass('clear-completed');
  });

  test('calls onClearCompleted when clicked', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    
    const button = screen.getByTestId('clear-completed-button');
    fireEvent.click(button);
    
    expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
  });

  test('renders as enabled by default', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    
    const button = screen.getByTestId('clear-completed-button');
    expect(button).not.toBeDisabled();
  });

  test('renders as disabled when disabled prop is true', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
    
    const button = screen.getByTestId('clear-completed-button');
    expect(button).toBeDisabled();
  });

  test('renders as enabled when disabled prop is false', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={false} />);
    
    const button = screen.getByTestId('clear-completed-button');
    expect(button).not.toBeDisabled();
  });

  test('does not call onClearCompleted when clicked while disabled', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
    
    const button = screen.getByTestId('clear-completed-button');
    fireEvent.click(button);
    
    expect(mockOnClearCompleted).not.toHaveBeenCalled();
  });

  test('callback is memoized and updates when onClearCompleted changes', () => {
    const { rerender } = render(
      <ClearCompletedButton onClearCompleted={mockOnClearCompleted} />
    );
    
    const button = screen.getByTestId('clear-completed-button');
    fireEvent.click(button);
    expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);

    const newMockOnClearCompleted = jest.fn();
    rerender(<ClearCompletedButton onClearCompleted={newMockOnClearCompleted} />);
    
    fireEvent.click(button);
    expect(newMockOnClearCompleted).toHaveBeenCalledTimes(1);
    expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
  });

  test('multiple clicks call onClearCompleted multiple times', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    
    const button = screen.getByTestId('clear-completed-button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(mockOnClearCompleted).toHaveBeenCalledTimes(3);
  });
});