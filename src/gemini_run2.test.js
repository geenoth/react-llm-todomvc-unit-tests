import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
    // Test case 1: Component renders correctly
    test('renders the button with the correct text', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Clear completed');
    });

    // Test case 2: onClick event handler is called
    test('calls onClearCompleted when clicked', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        fireEvent.click(buttonElement);
        
        expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
    });

    // Test case 3: Component is enabled by default
    test('is enabled by default', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).not.toBeDisabled();
        expect(buttonElement).toBeEnabled();
    });

    // Test case 4: disabled prop works correctly when false
    test('is enabled when disabled prop is false', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={false} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toBeEnabled();
    });

    // Test case 5: disabled prop works correctly when true
    test('is disabled when disabled prop is true', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toBeDisabled();
    });

    // Test case 6: onClick handler is not called when disabled
    test('does not call onClearCompleted when clicked and disabled', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        fireEvent.click(buttonElement);
        
        expect(mockOnClearCompleted).not.toHaveBeenCalled();
    });
});