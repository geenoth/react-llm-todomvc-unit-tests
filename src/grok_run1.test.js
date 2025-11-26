import { render, screen } from '@testing-library/react';
import { RemainingCounter } from './12_RemainingCounter';

describe('RemainingCounter', () => {
  test('renders the correct count and singular item text when count is 1', () => {
    render(<RemainingCounter count={1} />);
    const counterElement = screen.getByTestId('remaining-counter');
    expect(counterElement).toHaveTextContent('1 item left!');
  });

  test('renders the correct count and plural items text when count is greater than 1', () => {
    render(<RemainingCounter count={3} />);
    const counterElement = screen.getByTestId('remaining-counter');
    expect(counterElement).toHaveTextContent('3 items left!');
  });

  test('renders the correct count and plural items text when count is 0', () => {
    render(<RemainingCounter count={0} />);
    const counterElement = screen.getByTestId('remaining-counter');
    expect(counterElement).toHaveTextContent('0 items left!');
  });

  test('renders with default count of 0 when no count prop is provided', () => {
    render(<RemainingCounter />);
    const counterElement = screen.getByTestId('remaining-counter');
    expect(counterElement).toHaveTextContent('0 items left!');
  });

  test('has the correct class name for styling', () => {
    render(<RemainingCounter count={2} />);
    const counterElement = screen.getByTestId('remaining-counter');
    expect(counterElement).toHaveClass('todo-count');
  });
});