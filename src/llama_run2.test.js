import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton component', () => {
  const onDestroy = jest.fn();
  const todoId = '123';

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByTestId } = render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);
    expect(getByTestId('destroy-button')).toBeInTheDocument();
  });

  it('calls onDestroy when clicked', () => {
    const { getByTestId } = render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);
    const button = getByTestId('destroy-button');
    fireEvent.click(button);
    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(onDestroy).toHaveBeenCalledWith(todoId);
  });

  it('has correct aria-label', () => {
    const { getByTestId } = render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);
    const button = getByTestId('destroy-button');
    expect(button.getAttribute('aria-label')).toBe(`Delete todo ${todoId}`);
  });
});