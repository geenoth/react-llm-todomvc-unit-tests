/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FilterLink_Completed } from './11_FilterLink_Completed';

// Mock classnames module
jest.mock('classnames', () => {
    return jest.fn((...args) => {
        const classes = [];
        args.forEach(arg => {
            if (typeof arg === 'string') {
                classes.push(arg);
            } else if (typeof arg === 'object' && arg !== null) {
                Object.keys(arg).forEach(key => {
                    if (arg[key]) {
                        classes.push(key);
                    }
                });
            }
        });
        return classes.join(' ');
    });
});

describe('FilterLink_Completed', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('rendering', () => {
        test('renders without crashing', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            expect(screen.getByTestId('filter-link-completed')).toBeInTheDocument();
        });

        test('renders as a list item with an anchor tag', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            expect(link.tagName).toBe('A');
            expect(link.parentElement.tagName).toBe('LI');
        });

        test('renders with correct text "Completed"', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            expect(screen.getByText('Completed')).toBeInTheDocument();
        });

        test('renders with correct href attribute', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            expect(link).toHaveAttribute('href', '#/completed');
        });

        test('renders with data-testid attribute', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            expect(screen.getByTestId('filter-link-completed')).toBeInTheDocument();
        });
    });

    describe('isActive prop', () => {
        test('does not have "selected" class when isActive is false', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            expect(link).not.toHaveClass('selected');
        });

        test('has "selected" class when isActive is true', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed isActive={true} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            expect(link).toHaveClass('selected');
        });

        test('defaults isActive to false when not provided', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            expect(link).not.toHaveClass('selected');
        });
    });

    describe('user interactions', () => {
        test('calls onFilterChange with "completed" when clicked', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange).toHaveBeenCalledWith('completed');
        });

        test('prevents default behavior when clicked', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            });
            
            const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
            link.dispatchEvent(clickEvent);
            
            expect(preventDefaultSpy).toHaveBeenCalled();
        });

        test('calls onFilterChange on multiple clicks', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            
            fireEvent.click(link);
            fireEvent.click(link);
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
        });
    });

    describe('props handling', () => {
        test('works with different onFilterChange callbacks', () => {
            const mockOnFilterChange1 = jest.fn();
            const mockOnFilterChange2 = jest.fn();
            
            const { rerender } = render(
                <FilterLink_Completed onFilterChange={mockOnFilterChange1} />
            );
            
            const link = screen.getByTestId('filter-link-completed');
            fireEvent.click(link);
            
            expect(mockOnFilterChange1).toHaveBeenCalledWith('completed');
            expect(mockOnFilterChange2).not.toHaveBeenCalled();
            
            rerender(<FilterLink_Completed onFilterChange={mockOnFilterChange2} />);
            fireEvent.click(link);
            
            expect(mockOnFilterChange2).toHaveBeenCalledWith('completed');
        });

        test('updates className when isActive prop changes', () => {
            const mockOnFilterChange = jest.fn();
            const { rerender } = render(
                <FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />
            );
            
            const link = screen.getByTestId('filter-link-completed');
            expect(link).not.toHaveClass('selected');
            
            rerender(<FilterLink_Completed isActive={true} onFilterChange={mockOnFilterChange} />);
            expect(link).toHaveClass('selected');
            
            rerender(<FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />);
            expect(link).not.toHaveClass('selected');
        });
    });

    describe('classnames integration', () => {
        test('calls classnames with correct arguments when isActive is true', () => {
            const classnames = require('classnames');
            const mockOnFilterChange = jest.fn();
            
            render(<FilterLink_Completed isActive={true} onFilterChange={mockOnFilterChange} />);
            
            expect(classnames).toHaveBeenCalledWith({ selected: true });
        });

        test('calls classnames with correct arguments when isActive is false', () => {
            const classnames = require('classnames');
            const mockOnFilterChange = jest.fn();
            
            render(<FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />);
            
            expect(classnames).toHaveBeenCalledWith({ selected: false });
        });
    });

    describe('accessibility', () => {
        test('link is clickable and focusable', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            expect(link.tagName).toBe('A');
            expect(link).toHaveAttribute('href');
        });

        test('link can be found by role', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            
            expect(screen.getByRole('link', { name: 'Completed' })).toBeInTheDocument();
        });
    });

    describe('edge cases', () => {
        test('handles undefined onFilterChange gracefully during render', () => {
            // This tests that the component renders even if onFilterChange is undefined
            // The click would fail, but rendering should work
            expect(() => {
                render(<FilterLink_Completed isActive={false} />);
            }).not.toThrow();
        });

        test('component maintains structure with all props', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed isActive={true} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-completed');
            const listItem = link.parentElement;
            
            expect(listItem.tagName).toBe('LI');
            expect(link.tagName).toBe('A');
            expect(link.textContent).toBe('Completed');
            expect(link).toHaveAttribute('href', '#/completed');
            expect(link).toHaveClass('selected');
        });
    });
});