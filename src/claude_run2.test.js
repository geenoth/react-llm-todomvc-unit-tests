/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { FilterLink_All } from './09_FilterLink_All';

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

describe('FilterLink_All', () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    describe('Rendering', () => {
        test('renders without crashing', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            expect(screen.getByTestId('filter-link-all')).toBeInTheDocument();
        });

        test('renders as a list item with an anchor tag', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            expect(link.tagName).toBe('A');
            expect(link.parentElement.tagName).toBe('LI');
        });

        test('renders with correct text content "All"', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            expect(screen.getByText('All')).toBeInTheDocument();
        });

        test('renders with correct href attribute', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            expect(link).toHaveAttribute('href', '#/');
        });

        test('renders with data-testid attribute', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            expect(link).toHaveAttribute('data-testid', 'filter-link-all');
        });
    });

    describe('Props - isActive', () => {
        test('does not have "selected" class when isActive is false', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            expect(link).not.toHaveClass('selected');
        });

        test('has "selected" class when isActive is true', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            expect(link).toHaveClass('selected');
        });

        test('defaults isActive to false when not provided', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            expect(link).not.toHaveClass('selected');
        });

        test('does not have "selected" class when isActive is undefined', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All isActive={undefined} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            expect(link).not.toHaveClass('selected');
        });
    });

    describe('User Interactions - Click', () => {
        test('calls onFilterChange with "all" when clicked', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange).toHaveBeenCalledWith('all');
        });

        test('prevents default action on click', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(clickEvent, 'preventDefault');
            
            link.dispatchEvent(clickEvent);
            
            expect(preventDefaultSpy).toHaveBeenCalled();
        });

        test('calls onFilterChange multiple times on multiple clicks', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            fireEvent.click(link);
            fireEvent.click(link);
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
        });

        test('always passes "all" string to onFilterChange regardless of isActive state', () => {
            const mockOnFilterChange = jest.fn();
            
            const { rerender } = render(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );
            
            const link = screen.getByTestId('filter-link-all');
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalledWith('all');
            
            rerender(<FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />);
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalledWith('all');
        });
    });

    describe('Props - onFilterChange', () => {
        test('accepts onFilterChange as a function prop', () => {
            const mockOnFilterChange = jest.fn();
            expect(() => {
                render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            }).not.toThrow();
        });

        test('onFilterChange receives correct argument type', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            fireEvent.click(link);
            
            const callArg = mockOnFilterChange.mock.calls[0][0];
            expect(typeof callArg).toBe('string');
            expect(callArg).toBe('all');
        });
    });

    describe('Component Structure', () => {
        test('renders correct DOM structure', () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const li = container.querySelector('li');
            const a = container.querySelector('a');
            
            expect(li).toBeInTheDocument();
            expect(a).toBeInTheDocument();
            expect(li.contains(a)).toBe(true);
        });

        test('link is direct child of list item', () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const li = container.querySelector('li');
            const a = li.firstElementChild;
            
            expect(a.tagName).toBe('A');
        });
    });

    describe('Accessibility', () => {
        test('link is focusable', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            link.focus();
            
            expect(document.activeElement).toBe(link);
        });

        test('link has accessible text content', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByRole('link', { name: 'All' });
            expect(link).toBeInTheDocument();
        });
    });

    describe('Edge Cases', () => {
        test('handles rapid clicks correctly', () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId('filter-link-all');
            
            for (let i = 0; i < 10; i++) {
                fireEvent.click(link);
            }
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(10);
            mockOnFilterChange.mock.calls.forEach(call => {
                expect(call[0]).toBe('all');
            });
        });

        test('component re-renders correctly when isActive changes', () => {
            const mockOnFilterChange = jest.fn();
            const { rerender } = render(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );
            
            let link = screen.getByTestId('filter-link-all');
            expect(link).not.toHaveClass('selected');
            
            rerender(<FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />);
            link = screen.getByTestId('filter-link-all');
            expect(link).toHaveClass('selected');
            
            rerender(<FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />);
            link = screen.getByTestId('filter-link-all');
            expect(link).not.toHaveClass('selected');
        });

        test('component re-renders correctly when onFilterChange changes', () => {
            const mockOnFilterChange1 = jest.fn();
            const mockOnFilterChange2 = jest.fn();
            
            const { rerender } = render(
                <FilterLink_All onFilterChange={mockOnFilterChange1} />
            );
            
            const link = screen.getByTestId('filter-link-all');
            fireEvent.click(link);
            expect(mockOnFilterChange1).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange2).not.toHaveBeenCalled();
            
            rerender(<FilterLink_All onFilterChange={mockOnFilterChange2} />);
            fireEvent.click(link);
            expect(mockOnFilterChange1).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange2).toHaveBeenCalledTimes(1);
        });
    });

    describe('Classnames Integration', () => {
        test('classnames is called with correct arguments when isActive is true', () => {
            const classnames = require('classnames');
            const mockOnFilterChange = jest.fn();
            
            render(<FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />);
            
            expect(classnames).toHaveBeenCalledWith({ selected: true });
        });

        test('classnames is called with correct arguments when isActive is false', () => {
            const classnames = require('classnames');
            const mockOnFilterChange = jest.fn();
            
            render(<FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />);
            
            expect(classnames).toHaveBeenCalledWith({ selected: false });
        });
    });
});