/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RemainingCounter } from './12_RemainingCounter';

describe('RemainingCounter', () => {
    describe('rendering', () => {
        it('should render without crashing', () => {
            render(<RemainingCounter />);
            expect(screen.getByTestId('remaining-counter')).toBeInTheDocument();
        });

        it('should render with the correct className', () => {
            render(<RemainingCounter />);
            expect(screen.getByTestId('remaining-counter')).toHaveClass('todo-count');
        });

        it('should render as a span element', () => {
            render(<RemainingCounter />);
            const element = screen.getByTestId('remaining-counter');
            expect(element.tagName).toBe('SPAN');
        });
    });

    describe('default props', () => {
        it('should display "0 items left!" when no count is provided', () => {
            render(<RemainingCounter />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('0 items left!');
        });

        it('should use default count of 0', () => {
            render(<RemainingCounter />);
            expect(screen.getByText('0 items left!')).toBeInTheDocument();
        });
    });

    describe('singular/plural text', () => {
        it('should display "item" (singular) when count is 1', () => {
            render(<RemainingCounter count={1} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('1 item left!');
        });

        it('should display "items" (plural) when count is 0', () => {
            render(<RemainingCounter count={0} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('0 items left!');
        });

        it('should display "items" (plural) when count is 2', () => {
            render(<RemainingCounter count={2} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('2 items left!');
        });

        it('should display "items" (plural) when count is greater than 1', () => {
            render(<RemainingCounter count={5} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('5 items left!');
        });

        it('should display "items" (plural) for large numbers', () => {
            render(<RemainingCounter count={100} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('100 items left!');
        });

        it('should display "items" (plural) for very large numbers', () => {
            render(<RemainingCounter count={999999} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('999999 items left!');
        });
    });

    describe('props changes', () => {
        it('should update text when count prop changes from 0 to 1', () => {
            const { rerender } = render(<RemainingCounter count={0} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('0 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('1 item left!');
        });

        it('should update text when count prop changes from 1 to 2', () => {
            const { rerender } = render(<RemainingCounter count={1} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('1 item left!');

            rerender(<RemainingCounter count={2} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('2 items left!');
        });

        it('should update text when count prop changes from plural to singular', () => {
            const { rerender } = render(<RemainingCounter count={5} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('5 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('1 item left!');
        });

        it('should handle multiple prop updates correctly', () => {
            const { rerender } = render(<RemainingCounter count={0} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('0 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('1 item left!');

            rerender(<RemainingCounter count={3} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('3 items left!');

            rerender(<RemainingCounter count={0} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('0 items left!');
        });
    });

    describe('edge cases', () => {
        it('should handle negative numbers', () => {
            render(<RemainingCounter count={-1} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('-1 items left!');
        });

        it('should handle negative numbers other than -1', () => {
            render(<RemainingCounter count={-5} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('-5 items left!');
        });

        it('should handle decimal numbers', () => {
            render(<RemainingCounter count={1.5} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('1.5 items left!');
        });

        it('should handle zero explicitly passed', () => {
            render(<RemainingCounter count={0} />);
            expect(screen.getByTestId('remaining-counter')).toHaveTextContent('0 items left!');
        });
    });

    describe('accessibility', () => {
        it('should have accessible text content', () => {
            render(<RemainingCounter count={3} />);
            const element = screen.getByTestId('remaining-counter');
            expect(element.textContent).toBe('3 items left!');
        });

        it('should be queryable by data-testid', () => {
            render(<RemainingCounter count={2} />);
            const element = screen.getByTestId('remaining-counter');
            expect(element).toBeTruthy();
        });
    });

    describe('snapshot tests', () => {
        it('should match snapshot with count 0', () => {
            const { container } = render(<RemainingCounter count={0} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot with count 1', () => {
            const { container } = render(<RemainingCounter count={1} />);
            expect(container.firstChild).toMatchSnapshot();
        });

        it('should match snapshot with count greater than 1', () => {
            const { container } = render(<RemainingCounter count={5} />);
            expect(container.firstChild).toMatchSnapshot();
        });
    });
});