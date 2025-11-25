import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_Active } from "./10_FilterLink_Active";

describe('FilterLink_Active', () => {
    // Test case 1: Correct rendering of the component
    test('renders the link with the text "Active"', () => {
        render(<FilterLink_Active onFilterChange={() => {}} />);
        const linkElement = screen.getByTestId('filter-link-active');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent('Active');
        expect(linkElement).toHaveAttribute('href', '#/active');
    });

    // Test case 2: Prop 'isActive' is false (default)
    test('does not have the "selected" class when isActive is false', () => {
        render(<FilterLink_Active isActive={false} onFilterChange={() => {}} />);
        const linkElement = screen.getByTestId('filter-link-active');
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test case 3: Prop 'isActive' is true
    test('has the "selected" class when isActive is true', () => {
        render(<FilterLink_Active isActive={true} onFilterChange={() => {}} />);
        const linkElement = screen.getByTestId('filter-link-active');
        expect(linkElement).toHaveClass('selected');
    });

    // Test case 4: User interaction (click)
    test('calls onFilterChange with "active" when clicked', () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const linkElement = screen.getByTestId('filter-link-active');
        fireEvent.click(linkElement);
        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith('active');
    });

    // Test case 5: Click event's default behavior is prevented
    test('prevents the default click behavior', () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const linkElement = screen.getByTestId('filter-link-active');
        
        // Create a click event with a mock preventDefault function
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
        
        fireEvent(linkElement, clickEvent);
        
        expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
        
        // Clean up the spy
        preventDefaultSpy.mockRestore();
    });
});