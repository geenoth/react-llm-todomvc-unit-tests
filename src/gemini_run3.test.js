import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RemainingCounter } from './12_RemainingCounter';

describe('RemainingCounter', () => {
    // Test case 1: Test correct rendering with the default prop
    test('should render with default count of 0 and plural "items"', () => {
        render(<RemainingCounter />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toBeInTheDocument();
        expect(counterElement).toHaveTextContent('0 items left!');
    });

    // Test case 2: Test rendering with a count of 0
    test('should display "0 items left!" when count is 0', () => {
        render(<RemainingCounter count={0} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('0 items left!');
    });

    // Test case 3: Test rendering with a count of 1 for singular "item"
    test('should display "1 item left!" when count is 1', () => {
        render(<RemainingCounter count={1} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('1 item left!');
    });

    // Test case 4: Test rendering with a count greater than 1 for plural "items"
    test('should display "5 items left!" when count is 5', () => {
        render(<RemainingCounter count={5} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('5 items left!');
    });

    // Test case 5: Test component structure and className
    test('should render a span with the correct className', () => {
        const { container } = render(<RemainingCounter count={3} />);
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const spanElement = container.querySelector('span.todo-count');
        expect(spanElement).not.toBeNull();
        expect(spanElement).toBeInTheDocument();
    });
});