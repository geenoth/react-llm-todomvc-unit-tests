import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RemainingCounter } from './12_RemainingCounter';

describe('RemainingCounter', () => {

    test('should render correctly with default prop', () => {
        render(<RemainingCounter />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toBeInTheDocument();
        expect(counterElement).toHaveTextContent('0 items left!');
    });

    test('should display "0 items left!" when count is 0', () => {
        render(<RemainingCounter count={0} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('0 items left!');
    });

    test('should display "1 item left!" when count is 1', () => {
        render(<RemainingCounter count={1} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('1 item left!');
    });

    test('should display "5 items left!" when count is 5', () => {
        render(<RemainingCounter count={5} />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveTextContent('5 items left!');
    });

    test('should have the correct class name', () => {
        render(<RemainingCounter />);
        const counterElement = screen.getByTestId('remaining-counter');
        expect(counterElement).toHaveClass('todo-count');
    });

    test('should update correctly when props change', () => {
        const { rerender } = render(<RemainingCounter count={3} />);
        expect(screen.getByTestId('remaining-counter')).toHaveTextContent('3 items left!');

        rerender(<RemainingCounter count={1} />);
        expect(screen.getByTestId('remaining-counter')).toHaveTextContent('1 item left!');
    });
});