import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  test('renders the button correctly', () => {
    render(<DestroyButton onDestroy={() => {}} todoId={1} />);
    const buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('destroy');
  });

  test('calls the onDestroy prop with the correct todoId when clicked', () => {
    const mockOnDestroy = jest.fn();
    const todoId = 123;
    render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
    const buttonElement = screen.getByTestId('destroy-button');
    fireEvent.click(buttonElement);
    expect(mockOnDestroy).toHaveBeenCalledTimes(1);
    expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
  });

  test('has the correct aria-label attribute', () => {
    const todoId = 456;
    render(<DestroyButton onDestroy={() => {}} todoId={todoId} />);
    const buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
  });

  test('re-renders correctly when props change', () => {
    const initialTodoId = 1;
    const { rerender } = render(<DestroyButton onDestroy={() => {}} todoId={initialTodoId} />);
    let buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toHaveAttribute('aria-label', `Delete todo ${initialTodoId}`);

    const newTodoId = 2;
    const mockOnDestroy = jest.fn();
    rerender(<DestroyButton onDestroy={mockOnDestroy} todoId={newTodoId} />);
    buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toHaveAttribute('aria-label', `Delete todo ${newTodoId}`);

    fireEvent.click(buttonElement);
    expect(mockOnDestroy).toHaveBeenCalledWith(newTodoId);
  });
});