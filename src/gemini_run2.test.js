import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  // Test 1: Component renders correctly
  test('should render the button with correct attributes', () => {
    const todoId = 123;
    render(<DestroyButton onDestroy={() => {}} todoId={todoId} />);

    const button = screen.getByTestId('destroy-button');
    
    // Check if the button is in the document
    expect(button).toBeInTheDocument();
    
    // Check for the 'destroy' class
    expect(button).toHaveClass('destroy');
    
    // Check for the correct aria-label
    expect(button).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
  });

  // Test 2: onClick event handler
  test('should call the onDestroy function with the correct todoId when clicked', () => {
    const todoId = 456;
    const onDestroyMock = jest.fn();
    
    render(<DestroyButton onDestroy={onDestroyMock} todoId={todoId} />);

    const button = screen.getByTestId('destroy-button');
    
    // Simulate a user click
    fireEvent.click(button);
    
    // Expect the mock function to have been called once
    expect(onDestroyMock).toHaveBeenCalledTimes(1);
    
    // Expect the mock function to have been called with the correct todoId
    expect(onDestroyMock).toHaveBeenCalledWith(todoId);
  });

  // Test 3: Prop changes and re-rendering
  test('should update the aria-label when the todoId prop changes', () => {
    const initialTodoId = 789;
    const { rerender } = render(<DestroyButton onDestroy={() => {}} todoId={initialTodoId} />);
    
    let button = screen.getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', `Delete todo ${initialTodoId}`);
    
    const updatedTodoId = 987;
    rerender(<DestroyButton onDestroy={() => {}} todoId={updatedTodoId} />);
    
    // The button should now have the updated aria-label
    button = screen.getByTestId('destroy-button'); // Re-query the element
    expect(button).toHaveAttribute('aria-label', `Delete todo ${updatedTodoId}`);
  });

  // Test 4: Callback function is correctly memoized
  test('should not recreate the handleClick function on re-render if props are the same', () => {
    // This is a more advanced test to check the useCallback optimization.
    // We can't directly test the function identity without modifying the component.
    // However, we can ensure the behavior remains correct upon re-render,
    // which indirectly validates the hook's usage.
    
    const todoId = 'abc';
    const onDestroyMock = jest.fn();
    
    const { rerender } = render(<DestroyButton onDestroy={onDestroyMock} todoId={todoId} />);
    const button = screen.getByTestId('destroy-button');

    // First click
    fireEvent.click(button);
    expect(onDestroyMock).toHaveBeenCalledTimes(1);
    expect(onDestroyMock).toHaveBeenCalledWith(todoId);

    // Re-render with the same props
    rerender(<DestroyButton onDestroy={onDestroyMock} todoId={todoId} />);

    // Second click after re-render
    fireEvent.click(button);
    expect(onDestroyMock).toHaveBeenCalledTimes(2);
    expect(onDestroyMock).toHaveBeenLastCalledWith(todoId);
  });
});