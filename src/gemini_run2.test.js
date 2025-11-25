import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_All } from "./09_FilterLink_All";

describe('FilterLink_All', () => {
    // Test 1: Correct rendering
    test('renders the link with "All" text', () => {
        render(<FilterLink_All />);
        const linkElement = screen.getByTestId('filter-link-all');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent('All');
        expect(linkElement.tagName).toBe('A');
        expect(screen.getByText('All').closest('li')).toBeInTheDocument();
    });

    // Test 2: Props - isActive defaults to false
    test('does not have "selected" class when isActive is false or not provided', () => {
        const { rerender } = render(<FilterLink_All />);
        const linkElement = screen.getByTestId('filter-link-all');
        expect(linkElement).not.toHaveClass('selected');

        // Rerender with isActive={false} explicitly
        rerender(<FilterLink_All isActive={false} />);
        expect(screen.getByTestId('filter-link-all')).not.toHaveClass('selected');
    });

    // Test 3: Props - isActive is true
    test('has "selected" class when isActive is true', () => {
        render(<FilterLink_All isActive={true} />);
        const linkElement = screen.getByTestId('filter-link-all');
        expect(linkElement).toHaveClass('selected');
    });

    // Test 4: User Interaction - click event
    test('calls onFilterChange with "all" when clicked', () => {
        const onFilterChangeMock = jest.fn();
        render(<FilterLink_All onFilterChange={onFilterChangeMock} />);

        const linkElement = screen.getByTestId('filter-link-all');
        fireEvent.click(linkElement);

        // Check if the mock function was called
        expect(onFilterChangeMock).toHaveBeenCalledTimes(1);

        // Check if it was called with the correct argument
        expect(onFilterChangeMock).toHaveBeenCalledWith('all');
    });

    // Test 5: User Interaction - click event prevents default behavior
    test('prevents the default link behavior on click', () => {
        const onFilterChangeMock = jest.fn();
        render(<FilterLink_All onFilterChange={onFilterChangeMock} />);
        const linkElement = screen.getByTestId('filter-link-all');

        let defaultPrevented = false;
        fireEvent(
            linkElement,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                // A simple way to check if preventDefault was called
                preventDefault: () => {
                    defaultPrevented = true;
                },
            }),
        );
        expect(defaultPrevented).toBe(true);
    });
});