import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
    // Test 1: Correct rendering
    test('renders the button with the correct text', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Clear completed');
    });

    // Test 2: Enabled by default
    test('is enabled by default when the disabled prop is not provided', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).not.toBeDisabled();
    });

    // Test 3: Prop 'disabled' as false
    test('is enabled when the disabled prop is explicitly set to false', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={false} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).not.toBeDisabled();
    });

    // Test 4: Click interaction when enabled
    test('calls the onClearCompleted function when clicked', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        fireEvent.click(buttonElement);
        
        expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
    });

    // Test 5: Prop 'disabled' as true
    test('is disabled when the disabled prop is set to true', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toBeDisabled();
    });

    // Test 6: Click interaction when disabled
    test('does not call the onClearCompleted function when disabled and clicked', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        fireEvent.click(buttonElement);
        
        expect(mockOnClearCompleted).not.toHaveBeenCalled();
    });

    // Test 7: Correct class name
    test('has the correct CSS class name', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toHaveClass('clear-completed');
    });
});