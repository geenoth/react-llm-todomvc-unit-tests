import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  test('should render the button correctly', () => {
    const todoId = 1;
    const onDestroy = jest.fn();
    render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);

    const buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('destroy');
    expect(buttonElement).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
  });

  test('should call onDestroy with the correct todoId when clicked', () => {
    const todoId = 42;
    const onDestroy = jest.fn();
    render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);

    const buttonElement = screen.getByTestId('destroy-button');
    fireEvent.click(buttonElement);

    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(onDestroy).toHaveBeenCalledWith(todoId);
  });

  test('should handle different todoId props correctly', () => {
    const todoId = 'abc-123';
    const onDestroy = jest.fn();
    render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);

    const buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toHaveAttribute('aria-label', `Delete todo ${todoId}`);

    fireEvent.click(buttonElement);
    expect(onDestroy).toHaveBeenCalledWith(todoId);
  });
  
  test('should update aria-label and click handler when todoId prop changes', () => {
    const initialTodoId = 100;
    const updatedTodoId = 200;
    const onDestroy = jest.fn();
    
    const { rerender } = render(<DestroyButton onDestroy={onDestroy} todoId={initialTodoId} />);
    
    let buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toHaveAttribute('aria-label', `Delete todo ${initialTodoId}`);

    // Re-render with new props
    rerender(<DestroyButton onDestroy={onDestroy} todoId={updatedTodoId} />);
    
    buttonElement = screen.getByTestId('destroy-button');
    expect(buttonElement).toHaveAttribute('aria-label', `Delete todo ${updatedTodoId}`);
    
    fireEvent.click(buttonElement);
    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(onDestroy).toHaveBeenCalledWith(updatedTodoId);
  });
});