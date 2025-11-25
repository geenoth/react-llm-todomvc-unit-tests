/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { DestroyButton } from './03_DestroyButton';

describe('DestroyButton', () => {
    let mockOnDestroy;

    beforeEach(() => {
        mockOnDestroy = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders button with correct attributes', () => {
        const todoId = 'test-123';
        render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
        
        const button = screen.getByTestId('destroy-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass('destroy');
        expect(button).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
    });

    test('calls onDestroy with correct todoId when clicked', () => {
        const todoId = 'test-456';
        render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
        
        const button = screen.getByTestId('destroy-button');
        fireEvent.click(button);
        
        expect(mockOnDestroy).toHaveBeenCalledTimes(1);
        expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
    });

    test('handles multiple clicks', () => {
        const todoId = 'test-789';
        render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
        
        const button = screen.getByTestId('destroy-button');
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        
        expect(mockOnDestroy).toHaveBeenCalledTimes(3);
        expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
    });

    test('updates callback when props change', () => {
        const todoId1 = 'test-111';
        const todoId2 = 'test-222';
        
        const { rerender } = render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId1} />);
        
        const button = screen.getByTestId('destroy-button');
        fireEvent.click(button);
        
        expect(mockOnDestroy).toHaveBeenCalledWith(todoId1);
        
        const newMockOnDestroy = jest.fn();
        rerender(<DestroyButton onDestroy={newMockOnDestroy} todoId={todoId2} />);
        
        fireEvent.click(button);
        
        expect(newMockOnDestroy).toHaveBeenCalledWith(todoId2);
        expect(mockOnDestroy).toHaveBeenCalledTimes(1);
    });

    test('renders with undefined todoId', () => {
        render(<DestroyButton onDestroy={mockOnDestroy} todoId={undefined} />);
        
        const button = screen.getByTestId('destroy-button');
        expect(button).toHaveAttribute('aria-label', 'Delete todo undefined');
        
        fireEvent.click(button);
        expect(mockOnDestroy).toHaveBeenCalledWith(undefined);
    });

    test('renders with null todoId', () => {
        render(<DestroyButton onDestroy={mockOnDestroy} todoId={null} />);
        
        const button = screen.getByTestId('destroy-button');
        expect(button).toHaveAttribute('aria-label', 'Delete todo null');
        
        fireEvent.click(button);
        expect(mockOnDestroy).toHaveBeenCalledWith(null);
    });

    test('renders with numeric todoId', () => {
        const todoId = 123;
        render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
        
        const button = screen.getByTestId('destroy-button');
        expect(button).toHaveAttribute('aria-label', `Delete todo ${todoId}`);
        
        fireEvent.click(button);
        expect(mockOnDestroy).toHaveBeenCalledWith(todoId);
    });

    test('handles missing onDestroy prop gracefully', () => {
        const todoId = 'test-333';
        render(<DestroyButton onDestroy={undefined} todoId={todoId} />);
        
        const button = screen.getByTestId('destroy-button');
        
        // Should not throw error when clicking
        expect(() => fireEvent.click(button)).not.toThrow();
    });

    test('memoizes click handler correctly', () => {
        const todoId = 'test-memoize';
        const { rerender } = render(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
        
        const button1 = screen.getByTestId('destroy-button');
        const clickHandler1 = button1.onclick;
        
        // Rerender with same props
        rerender(<DestroyButton onDestroy={mockOnDestroy} todoId={todoId} />);
        
        const button2 = screen.getByTestId('destroy-button');
        const clickHandler2 = button2.onclick;
        
        // Handler should be the same due to useCallback
        expect(clickHandler1).toBe(clickHandler2);
        
        // Rerender with different todoId
        rerender(<DestroyButton onDestroy={mockOnDestroy} todoId="different-id" />);
        
        const button3 = screen.getByTestId('destroy-button');
        const clickHandler3 = button3.onclick;
        
        // Handler should be different
        expect(clickHandler1).not.toBe(clickHandler3);
    });
});