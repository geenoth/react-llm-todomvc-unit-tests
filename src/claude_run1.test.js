import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
  let mockOnClearCompleted;

  beforeEach(() => {
    mockOnClearCompleted = jest.fn();
  });

  afterEach(() => {
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
    expect(mockOnClearCompleted).toHaveBeenCalledWith();
  });

  test('is enabled by default', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    
    const button = screen.getByTestId('clear-completed-button');
    expect(button).not.toBeDisabled();
  });

  test('is disabled when disabled prop is true', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
    
    const button = screen.getByTestId('clear-completed-button');
    expect(button).toBeDisabled();
  });

  test('is enabled when disabled prop is false', () => {
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

  test('multiple clicks call onClearCompleted multiple times', () => {
    render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    
    const button = screen.getByTestId('clear-completed-button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(mockOnClearCompleted).toHaveBeenCalledTimes(3);
  });

  test('callback is memoized with useCallback', () => {
    const { rerender } = render(
      <ClearCompletedButton onClearCompleted={mockOnClearCompleted} />
    );
    
    const button = screen.getByTestId('clear-completed-button');
    const firstOnClick = button.onclick;
    
    // Re-render with same props
    rerender(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
    const secondOnClick = button.onclick;
    
    expect(firstOnClick).toBe(secondOnClick);
  });

  test('callback changes when onClearCompleted prop changes', () => {
    const { rerender } = render(
      <ClearCompletedButton onClearCompleted={mockOnClearCompleted} />
    );
    
    const button = screen.getByTestId('clear-completed-button');
    const firstOnClick = button.onclick;
    
    const newMockOnClearCompleted = jest.fn();
    rerender(<ClearCompletedButton onClearCompleted={newMockOnClearCompleted} />);
    const secondOnClick = button.onclick;
    
    expect(firstOnClick).not.toBe(secondOnClick);
  });

  test('renders correctly with all props', () => {
    const { container } = render(
      <ClearCompletedButton 
        onClearCompleted={mockOnClearCompleted} 
        disabled={true} 
      />
    );
    
    expect(container.firstChild).toMatchSnapshot();
  });
});