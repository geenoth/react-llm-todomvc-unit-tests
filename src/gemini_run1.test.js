import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ClearCompletedButton } from './04_ClearCompletedButton';

describe('ClearCompletedButton', () => {
    // Test 1: Correct rendering
    test('renders the button with correct text', () => {
        render(<ClearCompletedButton onClearCompleted={() => {}} />);
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveTextContent('Clear completed');
    });

    // Test 2: User interaction (click)
    test('calls onClearCompleted prop when clicked', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        fireEvent.click(buttonElement);
        
        expect(mockOnClearCompleted).toHaveBeenCalledTimes(1);
    });

    // Test 3: Props (disabled=false, default)
    test('is enabled by default', () => {
        render(<ClearCompletedButton onClearCompleted={() => {}} />);
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).not.toBeDisabled();
    });

    // Test 4: Props (disabled=true)
    test('is disabled when the disabled prop is true', () => {
        render(<ClearCompletedButton onClearCompleted={() => {}} disabled={true} />);
        const buttonElement = screen.getByTestId('clear-completed-button');
        expect(buttonElement).toBeDisabled();
    });

    // Test 5: User interaction when disabled
    test('does not call onClearCompleted prop when clicked if disabled', () => {
        const mockOnClearCompleted = jest.fn();
        render(<ClearCompletedButton onClearCompleted={mockOnClearCompleted} disabled={true} />);
        
        const buttonElement = screen.getByTestId('clear-completed-button');
        fireEvent.click(buttonElement);
        
        expect(mockOnClearCompleted).not.toHaveBeenCalled();
    });

    // Test 6: Matches snapshot
    test('matches snapshot when enabled', () => {
        const { asFragment } = render(<ClearCompletedButton onClearCompleted={() => {}} />);
        expect(asFragment()).toMatchSnapshot();
    });
    
    test('matches snapshot when disabled', () => {
        const { asFragment } = render(<ClearCompletedButton onClearCompleted={() => {}} disabled={true} />);
        expect(asFragment()).toMatchSnapshot();
    });
});