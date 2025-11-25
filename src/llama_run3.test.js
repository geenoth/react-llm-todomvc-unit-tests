import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
  const onClearCompleted = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} />);
    expect(getByText('Clear completed')).toBeInTheDocument();
    expect(getByTestId('clear-completed-button')).toBeInTheDocument();
  });

  it('calls onClearCompleted when clicked', () => {
    const { getByTestId } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} />);
    const button = getByTestId('clear-completed-button');
    fireEvent.click(button);
    expect(onClearCompleted).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    const { getByTestId } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} disabled />);
    const button = getByTestId('clear-completed-button');
    expect(button.disabled).toBe(true);
  });

  it('is not disabled when disabled prop is false', () => {
    const { getByTestId } = render(<ClearCompletedButton onClearCompleted={onClearCompleted} />);
    const button = getByTestId('clear-completed-button');
    expect(button.disabled).toBe(false);
  });
});