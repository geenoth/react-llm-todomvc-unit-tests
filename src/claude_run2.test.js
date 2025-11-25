/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
    let mockOnClearCompleted;

    beforeEach(() => {
        mockOnClearCompleted = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders button with correct text', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const button = screen.getByTestId('clear-completed-button');
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Clear completed');
    });

    test('renders with correct class name', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const button = screen.getByTestId('clear-completed-button');
        expect(button).toHaveClass('clear-completed');
    });

    test('calls onClearCompleted when clicked', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const button = screen.getByTestId('clear-completed-button');
        fireEvent.click(button);
        
        expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
    });

    test('button is enabled by default', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const button = screen.getByTestId('clear-completed-button');
        expect(button).not.toBeDisabled();
    });

    test('button is disabled when disabled prop is true', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
        
        const button = screen.getByTestId('clear-completed-button');
        expect(button).toBeDisabled();
    });

    test('button is enabled when disabled prop is false', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={false} />);
        
        const button = screen.getByTestId('clear-completed-button');
        expect(button).not.toBeDisabled();
    });

    test('does not call onClearCompleted when clicked while disabled', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
        
        const button = screen.getByTestId('clear-completed-button');
        fireEvent.click(button);
        
        expect(mockOnClearCompleted).not.toHaveBeenCalled();
    });

    test('multiple clicks call onClearCompleted multiple times', () => {
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const button = screen.getByTestId('clear-completed-button');
        fireEvent.click(button);
        fireEvent.click(button);
        fireEvent.click(button);
        
        expect(mockOnClearCompleted).toHaveBeenCalledTimes(3);
    });

    test('maintains callback reference when onClearCompleted prop changes', () => {
        const { rerender } = render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const button = screen.getByTestId('clear-completed-button');
        fireEvent.click(button);
        expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
        
        const newMockOnClearCompleted = jest.fn();
        rerender(<ClearCompletedButton onClearCompleted={newMockOnClearCompleted} />);
        
        fireEvent.click(button);
        expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
        expect(newMockOnClearCompleted).toHaveBeenCalledTimes(1);
    });

    test('renders without crashing when onClearCompleted is undefined', () => {
        const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        expect(() => {
            render(<ClearCompletedButton onClearCompleted={undefined} />);
        }).not.toThrow();
        
        consoleError.mockRestore();
    });
});