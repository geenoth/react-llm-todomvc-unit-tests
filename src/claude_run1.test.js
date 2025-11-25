import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  let mockOnDestroy;
  
  beforeEach(() => {
    mockOnDestroy = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with required props', () => {
    const { getByTestId } = render(
      <DestroyButton onDestroy={mockOnDestroy} todoId="123" />
    );
    
    const button = getByTestId('destroy-button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('destroy');
  });

  test('has correct aria-label with todoId', () => {
    const todoId = '456';
    const { getByTestId } = render(
      <DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />
    );
    
    const button = getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
  });

  test('calls onDestroy with correct todoId when clicked', () => {
    const todoId = '789';
    const { getByTestId } = render(
      <DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />
    );
    
    const button = getByTestId('destroy-button');
    fireEvent.click(button);
    
    expect(mockOnDestroy).toHaveBeenCalledTimes(1);
    expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
  });

  test('updates callback when props change', () => {
    const { getByTestId, rerender } = render(
      <DestroyButton onDestroy={mockOnDestroy} todoId="111" />
    );
    
    const button = getByTestId('destroy-button');
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith('111');
    
    const newMockOnDestroy = jest.fn();
    rerender(<DestroyButton onDestroy={newMockOnDestroy} todoId="222" />);
    
    fireEvent.click(button);
    expect(newMockOnDestroy).toHaveBeenCalledWith('222');
  });

  test('handles multiple clicks', () => {
    const todoId = '333';
    const { getByTestId } = render(
      <DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />
    );
    
    const button = getByTestId('destroy-button');
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    expect(mockOnDestroy).toHaveBeenCalledTimes(3);
    expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
  });

  test('renders with different todoId types', () => {
    const { getByTestId, rerender } = render(
      <DestroyButton onDestroy={mockOnDestroy} todoId={123} />
    );
    
    let button = getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', 'Delete todo 123');
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith(123);
    
    mockOnDestroy.mockClear();
    
    rerender(<DestroyButton onDestroy={mockOnDestroy} todoId={null} />);
    button = getByTestId('destroy-button');
    expect(button).toHaveAttribute('aria-label', 'Delete todo null');
    fireEvent.click(button);
    expect(mockOnDestroy).toHaveBeenCalledWith(null);
  });
});