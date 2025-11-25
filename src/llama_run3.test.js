import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
  const onDestroy = jest.fn();
  const todoId = 1;

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);
    expect(getByText(`Delete todo ${todoId}`)).toBeInTheDocument();
    expect(getByTestId('destroy-button')).toBeInTheDocument();
  });

  it('calls onDestroy when clicked', () => {
    const { getByTestId } = render(<DestroyButton onDestroy={onDestroy} todoId={todoId} />);
    const button = getByTestId('destroy-button');
    fireEvent.click(button);
    expect(onDestroy).toHaveBeenCalledTimes(1);
    expect(onDestroy).toHaveBeenCalledWith(todoId);
  });
});