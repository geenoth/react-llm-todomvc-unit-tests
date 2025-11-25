import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_All } from "./09_FilterLink_All"; // Assuming the component is in the same directory

describe('FilterLink_All', () => {

    // Test case 1: Component renders without crashing
    test('should render correctly', () => {
        const onFilterChange = jest.fn();
        render(<FilterLink_All onFilterChange={onFilterChange} />);
        
        const linkElement = screen.getByTestId('filter-link-all');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent('All');
        expect(linkElement).toHaveAttribute('href', '#/');
    });

    // Test case 2: Component renders with 'selected' class when isActive is true
    test('should have "selected" class when isActive prop is true', () => {
        const onFilterChange = jest.fn();
        render(<FilterLink_All isActive={true} onFilterChange={onFilterChange} />);
        
        const linkElement = screen.getByTestId('filter-link-all');
        expect(linkElement).toHaveClass('selected');
    });

    // Test case 3: Component renders without 'selected' class when isActive is false
    test('should not have "selected" class when isActive prop is false', () => {
        const onFilterChange = jest.fn();
        render(<FilterLink_All isActive={false} onFilterChange={onFilterChange} />);
        
        const linkElement = screen.getByTestId('filter-link-all');
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test case 4: Component renders without 'selected' class when isActive is not provided (default)
    test('should not have "selected" class when isActive prop is not provided', () => {
        const onFilterChange = jest.fn();
        render(<FilterLink_All onFilterChange={onFilterChange} />);
        
        const linkElement = screen.getByTestId('filter-link-all');
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test case 5: User interaction - onClick event
    test('should call onFilterChange with "all" when the link is clicked', () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
        
        const linkElement = screen.getByTestId('filter-link-all');
        fireEvent.click(linkElement);
        
        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith('all');
    });
    
    // Test case 6: User interaction - preventDefault is called on click
    test('should prevent the default anchor tag behavior on click', () => {
        const onFilterChange = jest.fn();
        render(<FilterLink_All onFilterChange={onFilterChange} />);

        const linkElement = screen.getByTestId('filter-link-all');
        
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        Object.defineProperty(clickEvent, 'preventDefault', { value: jest.fn() });

        fireEvent(linkElement, clickEvent);

        expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
});