/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { RemainingCounter } from './12_RemainingCounter';

describe('RemainingCounter', () => {
    describe('rendering', () => {
        it('should render with data-testid attribute', () => {
            render(<RemainingCounter count={0} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toBeInTheDocument();
        });

        it('should render with correct className', () => {
            render(<RemainingCounter count={0} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveClass('todo-count');
        });

        it('should render as a span element', () => {
            render(<RemainingCounter count={0} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter.tagName).toBe('SPAN');
        });
    });

    describe('default props', () => {
        it('should default count to 0 when no prop is provided', () => {
            render(<RemainingCounter />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('0 items left!');
        });
    });

    describe('singular/plural text', () => {
        it('should display "item" (singular) when count is 1', () => {
            render(<RemainingCounter count={1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('1 item left!');
        });

        it('should display "items" (plural) when count is 0', () => {
            render(<RemainingCounter count={0} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('0 items left!');
        });

        it('should display "items" (plural) when count is 2', () => {
            render(<RemainingCounter count={2} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('2 items left!');
        });

        it('should display "items" (plural) when count is 5', () => {
            render(<RemainingCounter count={5} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('5 items left!');
        });

        it('should display "items" (plural) when count is 100', () => {
            render(<RemainingCounter count={100} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('100 items left!');
        });
    });

    describe('prop changes', () => {
        it('should update text when count prop changes from 0 to 1', () => {
            const { rerender } = render(<RemainingCounter count={0} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('0 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(counter).toHaveTextContent('1 item left!');
        });

        it('should update text when count prop changes from 1 to 2', () => {
            const { rerender } = render(<RemainingCounter count={1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('1 item left!');

            rerender(<RemainingCounter count={2} />);
            expect(counter).toHaveTextContent('2 items left!');
        });

        it('should update text when count prop changes from 5 to 1', () => {
            const { rerender } = render(<RemainingCounter count={5} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('5 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(counter).toHaveTextContent('1 item left!');
        });

        it('should handle multiple prop updates correctly', () => {
            const { rerender } = render(<RemainingCounter count={0} />);
            const counter = screen.getByTestId('remaining-counter');

            expect(counter).toHaveTextContent('0 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(counter).toHaveTextContent('1 item left!');

            rerender(<RemainingCounter count={10} />);
            expect(counter).toHaveTextContent('10 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(counter).toHaveTextContent('1 item left!');

            rerender(<RemainingCounter count={0} />);
            expect(counter).toHaveTextContent('0 items left!');
        });
    });

    describe('edge cases', () => {
        it('should handle large numbers', () => {
            render(<RemainingCounter count={999999} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('999999 items left!');
        });

        it('should handle negative numbers', () => {
            render(<RemainingCounter count={-1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('-1 items left!');
        });

        it('should handle negative one as plural', () => {
            render(<RemainingCounter count={-1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter.textContent).toContain('items');
        });
    });

    describe('text format', () => {
        it('should have correct text format with count, item text, and "left!"', () => {
            render(<RemainingCounter count={3} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter.textContent).toBe('3 items left!');
        });

        it('should have correct text format for singular', () => {
            render(<RemainingCounter count={1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter.textContent).toBe('1 item left!');
        });
    });
});