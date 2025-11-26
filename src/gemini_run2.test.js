import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe('FilterLink_Completed', () => {
    // Test 1: Component renders correctly with default props
    test('renders the link with default props', () => {
        render(<FilterLink_Completed />);

        const linkElement = screen.getByTestId('filter-link-completed');
        
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent('Completed');
        expect(linkElement).toHaveAttribute('href', '#/completed');
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 2: Renders as "selected" when isActive prop is true
    test('applies the "selected" class when isActive is true', () => {
        render(<FilterLink_Completed isActive={true} />);

        const linkElement = screen.getByTestId('filter-link-completed');
        
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveClass('selected');
    });

    // Test 3: Renders without "selected" class when isActive prop is false
    test('does not apply the "selected" class when isActive is false', () => {
        render(<FilterLink_Completed isActive={false} />);

        const linkElement = screen.getByTestId('filter-link-completed');
        
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 4: Calls onFilterChange with "completed" when clicked
    test('calls onFilterChange with "completed" when the link is clicked', () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

        const linkElement = screen.getByTestId('filter-link-completed');
        fireEvent.click(linkElement);

        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
    });

    // Test 5: The default behavior of the click event is prevented
    test('prevents the default click behavior', () => {
        let defaultPrevented = false;
        const mockOnFilterChange = jest.fn();
        
        render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
        
        const linkElement = screen.getByTestId('filter-link-completed');
        
        fireEvent(
            linkElement,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                // A custom implementation to check if preventDefault was called
                preventDefault: () => {
                    defaultPrevented = true;
                },
            })
        );
        
        expect(defaultPrevented).toBe(true);
    });
});