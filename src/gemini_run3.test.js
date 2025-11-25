import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterLink_Active } from "./10_FilterLink_Active";

describe('FilterLink_Active', () => {
    // Test 1: Correct Rendering
    test('renders the link with correct text and href', () => {
        render(<FilterLink_Active onFilterChange={() => {}} />);
        const linkElement = screen.getByTestId('filter-link-active');

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent('Active');
        expect(linkElement).toHaveAttribute('href', '#/active');
    });

    // Test 2: State and Props - isActive is true
    test('applies the "selected" class when isActive prop is true', () => {
        render(<FilterLink_Active isActive={true} onFilterChange={() => {}} />);
        const linkElement = screen.getByTestId('filter-link-active');

        expect(linkElement).toHaveClass('selected');
    });

    // Test 3: State and Props - isActive is false (default)
    test('does not apply the "selected" class when isActive prop is false', () => {
        render(<FilterLink_Active isActive={false} onFilterChange={() => {}} />);
        const linkElement = screen.getByTestId('filter-link-active');

        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 4: State and Props - isActive is not provided (defaults to false)
    test('does not apply the "selected" class when isActive prop is not provided', () => {
        render(<FilterLink_Active onFilterChange={() => {}} />);
        const linkElement = screen.getByTestId('filter-link-active');

        expect(linkElement).not.toHaveClass('selected');
    });

    // Test 5: User Interaction - onClick
    test('calls onFilterChange with "active" when clicked', () => {
        const onFilterChangeMock = jest.fn();
        render(<FilterLink_Active onFilterChange={onFilterChangeMock} />);
        const linkElement = screen.getByTestId('filter-link-active');

        fireEvent.click(linkElement);

        expect(onFilterChangeMock).toHaveBeenCalledTimes(1);
        expect(onFilterChangeMock).toHaveBeenCalledWith('active');
    });

    // Test 6: User Interaction - preventDefault on click
    test('prevents the default link behavior on click', () => {
        const onFilterChangeMock = jest.fn();
        render(<FilterLink_Active onFilterChange={onFilterChangeMock} />);
        const linkElement = screen.getByTestId('filter-link-active');

        // fireEvent.click returns true if the event is not cancelled
        // and false if it is. We expect it to be false because of e.preventDefault().
        const clickEvent = new MouseEvent('click', { bubbles: true, cancelable: true });
        Object.defineProperty(clickEvent, 'preventDefault', { value: jest.fn() });
        fireEvent(linkElement, clickEvent);
        
        expect(clickEvent.preventDefault).toHaveBeenCalledTimes(1);
    });
});