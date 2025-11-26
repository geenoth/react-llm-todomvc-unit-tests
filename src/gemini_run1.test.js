import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RemainingCounter } from './12_RemainingCounter'; // Assuming the component is in './RemainingCounter.js'

describe('RemainingCounter', () => {
    test('should render correctly with a count of 0', () => {
        render(<RemainingCounter count={0} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toBeInTheDocument();
        expect(counterElement).toHaveTextContent('0 items left!');
    });

    test('should render the singular "item" when count is 1', () => {
        render(<RemainingCounter count={1} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('1 item left!');
    });

    test('should render the plural "items" when count is greater than 1', () => {
        render(<RemainingCounter count={5} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('5 items left!');
    });

    test('should render with the default prop when count is not provided', () => {
        render(<RemainingCounter />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('0 items left!');
    });

    test('should update correctly when the count prop changes', () => {
        const { rerender } = render(<RemainingCounter count={3} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('3 items left!');

        rerender(<RemainingCounter count={1} />);
        expect(counterElement).toHaveTextContent('1 item left!');

        rerender(<RemainingCounter count={10} />);
        expect(counterElement).toHaveTextContent('10 items left!');
    });
});