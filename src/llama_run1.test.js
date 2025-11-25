import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  const onDestroy = jest.fn();
  const todoId = 1;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders button with correct aria-label', () => {
    const { getByTestId } = render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);
    expect(getByTestId('destroy-button')).toBeInTheDocument();
    expect(getByTestId('destroy-button')).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
  });

  it('calls onDestroy with todoId on click', () => {
    const { getByTestId } = render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);
    const button = getByTestId('destroy-button');

    fireEvent.click(button);

    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(onDestroy).toHaveBeenCalledWith(todoId);
  });
});