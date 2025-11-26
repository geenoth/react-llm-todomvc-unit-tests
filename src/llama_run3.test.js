import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RemainingCounter } from './12_RemainingCounter';

describe('RemainingCounter', () => {
  it('renders correctly with count 0', () => {
    const { getByTestId } = render(<RemainingCounter count={0} />);
    expect(getByTestId('remaining-counter')).toHaveTextContent('0 items left!');
  });

  it('renders correctly with count 1', () => {
    const { getByTestId } = render(<RemainingCounter count={1} />);
    expect(getByTestId('remaining-counter')).toHaveTextContent('1 item left!');
  });

  it('renders correctly with count > 1', () => {
    const { getByTestId } = render(<RemainingCounter count={2} />);
    expect(getByTestId('remaining-counter')).toHaveTextContent('2 items left!');
  });
});