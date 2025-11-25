import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
  const onClearCompleted = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders button with correct text', () => {
    const { getByText } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} />);
    expect(getByText('Clear completed')).toBeInTheDocument();
  });

  it('renders button with correct class name', () => {
    const { getByTestId } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} />);
    expect(getByTestId('clear-completed-button')).toBeInTheDocument();
    expect(getByTestId('clear-completed-button')).toHaveClass('clear-completed');
  });

  it('calls onClearCompleted on click', () => {
    const { getByTestId } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} />);
    const button = getByTestId('clear-completed-button');

    fireEvent.click(button);

    expect(onClearCompleted).toHaveBeenCalledTimes(1);
  });

  it('renders button as disabled when disabled prop is true', () => {
    const { getByTestId } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} disabled={true} />);
    expect(getByTestId('clear-completed-button')).toBeDisabled();
  });
});