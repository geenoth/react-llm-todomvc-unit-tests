import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_Active } from "./10_FilterLink_Active";

describe('FilterLink_Active', () => {
    // Test 1: Correct Rendering
    test('renders the link with the correct text and href', () => {
        render(<FilterLink_Active />);
        const linkElement = screen.getByTestId('filter-link-active');

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent('Active');
        expect(linkElement).toHaveAttribute('href', '#/active');
    });

    // Test 2: State when not active
    test('does not have the "selected" class when isActive is false', () => {
        render(<FilterLink_Active isActive={false} />);
        const linkElement = screen.getByTestId('filter-link-active');
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 3: State when active
    test('has the "selected" class when isActive is true', () => {
        render(<FilterLink_Active isActive={true} />);
        const linkElement = screen.getByTestId('filter-link-active');
        expect(linkElement).toHaveClass('selected');
    });

    // Test 4: Default prop value
    test('defaults to not being active if isActive prop is not provided', () => {
        render(<FilterLink_Active />);
        const linkElement = screen.getByTestId('filter-link-active');
        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 5: User Interaction (Click)
    test('calls onFilterChange with "active" when clicked', () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const linkElement = screen.getByTestId('filter-link-active');

        fireEvent.click(linkElement);

        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith('active');
    });

    // Test 6: Click event default behavior prevention
    test('prevents the default click behavior', () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const linkElement = screen.getByTestId('filter-link-active');

        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        Object.defineProperty(clickEvent, 'preventDefault', { value: jest.fn() });

        fireEvent(linkElement, clickEvent);

        expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
});