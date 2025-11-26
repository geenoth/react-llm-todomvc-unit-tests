import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe('FilterLink_Completed', () => {

    // Test 1: Component renders correctly without any props
    test('should render the link with default props', () => {
        render(<FilterLink_Completed />);
        
        const linkElement = screen.getByTestId('filter-link-completed');
        
        // Check if the component is in the document
        expect(linkElement).toBeInTheDocument();
        
        // Check for the correct text content
        expect(linkElement).toHaveTextContent('Completed');
        
        // Check for the correct href attribute
        expect(linkElement).toHaveAttribute('href', '#/completed');
        
        // By default, isActive is false, so it should not have the 'selected' class
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 2: Component correctly applies 'selected' class when isActive is true
    test('should have the "selected" class when isActive prop is true', () => {
        render(<FilterLink_Completed isActive={true} />);
        
        const linkElement = screen.getByTestId('filter-link-completed');
        
        // Check for the presence of the 'selected' class
        expect(linkElement).toHaveClass('selected');
    });

    // Test 3: Component does not have 'selected' class when isActive is false
    test('should not have the "selected" class when isActive prop is false', () => {
        render(<FilterLink_Completed isActive={false} />);
        
        const linkElement = screen.getByTestId('filter-link-completed');
        
        // Ensure the 'selected' class is not present
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 4: Clicking the link calls the onFilterChange handler with the correct value
    test('should call onFilterChange with "completed" when clicked', () => {
        // Create a mock function for the onFilterChange prop
        const mockOnFilterChange = jest.fn();
        
        render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
        
        const linkElement = screen.getByTestId('filter-link-completed');
        
        // Simulate a user click
        fireEvent.click(linkElement);
        
        // Expect the mock function to have been called exactly once
        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        
        // Expect the mock function to have been called with 'completed'
        expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
    });

    // Test 5: Clicking the link prevents the default link behavior
    test('should prevent the default event on click', () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
        const linkElement = screen.getByTestId('filter-link-completed');

        // Create a click event and check if preventDefault is called
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');

        fireEvent(linkElement, clickEvent);

        // Verify that preventDefault was called
        expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    });
});