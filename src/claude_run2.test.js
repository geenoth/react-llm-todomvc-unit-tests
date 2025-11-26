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
        it('should render with count of 0 when no count prop is provided', () => {
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
        it('should update text when count prop changes from 1 to 2', () => {
            const { rerender } = render(<RemainingCounter count={1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('1 item left!');

            rerender(<RemainingCounter count={2} />);
            expect(counter).toHaveTextContent('2 items left!');
        });

        it('should update text when count prop changes from 2 to 1', () => {
            const { rerender } = render(<RemainingCounter count={2} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('2 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(counter).toHaveTextContent('1 item left!');
        });

        it('should update text when count prop changes from 0 to 1', () => {
            const { rerender } = render(<RemainingCounter count={0} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('0 items left!');

            rerender(<RemainingCounter count={1} />);
            expect(counter).toHaveTextContent('1 item left!');
        });

        it('should update text when count prop changes from 1 to 0', () => {
            const { rerender } = render(<RemainingCounter count={1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('1 item left!');

            rerender(<RemainingCounter count={0} />);
            expect(counter).toHaveTextContent('0 items left!');
        });
    });

    describe('edge cases', () => {
        it('should handle large numbers', () => {
            render(<RemainingCounter count={9999} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('9999 items left!');
        });

        it('should handle negative numbers', () => {
            render(<RemainingCounter count={-1} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('-1 items left!');
        });

        it('should handle decimal numbers', () => {
            render(<RemainingCounter count={1.5} />);
            const counter = screen.getByTestId('remaining-counter');
            expect(counter).toHaveTextContent('1.5 items left!');
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