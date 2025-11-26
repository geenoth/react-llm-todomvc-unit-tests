import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { RemainingCounter } from './12_RemainingCounter';

describe('RemainingCounter', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(<RemainingCounter count={5} />);
    expect(getByTestId('remaining-counter')).toBeInTheDocument();
    expect(getByTestId('remaining-counter')).toHaveTextContent('5 items left!');
  });

  it('renders singular item text when count is 1', () => {
    const { getByTestId } = render(<RemainingCounter count={1} />);
    expect(getByTestId('remaining-counter')).toHaveTextContent('1 item left!');
  });

  it('renders plural item text when count is greater than 1', () => {
    const { getByTestId } = render(<RemainingCounter count={5} />);
    expect(getByTestId('remaining-counter')).toHaveTextContent('5 items left!');
  });

  it('updates text content when count prop changes', () => {
    const { getByTestId, rerender } = render(<RemainingCounter count={5} />);
    expect(getByTestId('remaining-counter')).toHaveTextContent('5 items left!');
    rerender(<RemainingCounter count={10} />);
    expect(getByTestId('remaining-counter')).toHaveTextContent('10 items left!');
  });
});