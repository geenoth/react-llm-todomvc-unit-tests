import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox', () => {
    // Test 1: Correctly renders with default props
    test('renders with default props', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        const label = screen.getByText('Toggle All Input');

        expect(checkbox).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(checkbox).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });

    // Test 2: Renders as checked when allCompleted is true
    test('renders as checked when allCompleted prop is true', () => {
        render(<ToggleAllCheckbox allCompleted={true} onToggleAll={() => {}} disabled={false} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).toBeChecked();
    });

    // Test 3: Renders as unchecked when allCompleted is false
    test('renders as unchecked when allCompleted prop is false', () => {
        render(<ToggleAllCheckbox allCompleted={false} onToggleAll={() => {}} disabled={false} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).not.toBeChecked();
    });

    // Test 4: Renders as enabled when disabled is false
    test('is enabled when disabled prop is false', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} disabled={false} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).not.toBeDisabled();
    });

    // Test 5: Renders as disabled when disabled is true
    test('is disabled when disabled prop is true', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} disabled={true} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).toBeDisabled();
    });

    // Test 6: Calls onToggleAll with true when an unchecked checkbox is clicked
    test('calls onToggleAll with true when unchecked and clicked', () => {
        const mockOnToggleAll = jest.fn();
        render(<ToggleAllCheckbox allCompleted={false} onToggleAll={mockOnToggleAll} disabled={false} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
        expect(mockOnToggleAll).toHaveBeenCalledWith(true);
    });

    // Test 7: Calls onToggleAll with false when a checked checkbox is clicked
    test('calls onToggleAll with false when checked and clicked', () => {
        const mockOnToggleAll = jest.fn();
        render(<ToggleAllCheckbox allCompleted={true} onToggleAll={mockOnToggleAll} disabled={false} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
        expect(mockOnToggleAll).toHaveBeenCalledWith(false);
    });

    // Test 8: Does not call onToggleAll when disabled
    test('does not call onToggleAll when clicked if disabled', () => {
        const mockOnToggleAll = jest.fn();
        render(<ToggleAllCheckbox onToggleAll={mockOnToggleAll} disabled={true} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggleAll).not.toHaveBeenCalled();
    });

    // Test 9: Label is correctly associated with the checkbox
    test('label is correctly associated with the checkbox', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} />);
        const checkbox = screen.getByTestId('toggle-all-checkbox');
        const label = screen.getByText('Toggle All Input');
        
        expect(label).toHaveAttribute('for', checkbox.id);
        expect(checkbox).toHaveAttribute('id', 'toggle-all-checkbox');
    });
});