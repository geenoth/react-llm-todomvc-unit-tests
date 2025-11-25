import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ToggleAllCheckbox } from './07_ToggleAllCheckbox';

describe('ToggleAllCheckbox', () => {
    // Test 1: Component renders correctly with default props
    test('renders correctly with default props', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        const label = screen.getByText('Toggle All Input');

        expect(checkbox).toBeInTheDocument();
        expect(label).toBeInTheDocument();
        expect(checkbox).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });

    // Test 2: Renders as unchecked when allCompleted is false
    test('renders as unchecked when allCompleted is false', () => {
        render(<ToggleAllCheckbox allCompleted={false} onToggleAll={() => {}} disabled={false} />);
        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).not.toBeChecked();
    });

    // Test 3: Renders as checked when allCompleted is true
    test('renders as checked when allCompleted is true', () => {
        render(<ToggleAllCheckbox allCompleted={true} onToggleAll={() => {}} disabled={false} />);
        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).toBeChecked();
    });

    // Test 4: Renders as enabled when disabled is false
    test('renders as enabled when disabled is false', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} disabled={false} />);
        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).toBeEnabled();
    });

    // Test 5: Renders as disabled when disabled is true
    test('renders as disabled when disabled is true', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} disabled={true} />);
        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).toBeDisabled();
    });

    // Test 6: Calls onToggleAll with true when an unchecked checkbox is clicked
    test('calls onToggleAll with true when an unchecked checkbox is clicked', () => {
        const mockOnToggleAll = jest.fn();
        render(<ToggleAllCheckbox allCompleted={false} onToggleAll={mockOnToggleAll} disabled={false} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
        expect(mockOnToggleAll).toHaveBeenCalledWith(true);
    });

    // Test 7: Calls onToggleAll with false when a checked checkbox is clicked
    test('calls onToggleAll with false when a checked checkbox is clicked', () => {
        const mockOnToggleAll = jest.fn();
        render(<ToggleAllCheckbox allCompleted={true} onToggleAll={mockOnToggleAll} disabled={false} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
        expect(mockOnToggleAll).toHaveBeenCalledWith(false);
    });

    // Test 8: Does not call onToggleAll when a disabled checkbox is clicked
    test('does not call onToggleAll when a disabled checkbox is clicked', () => {
        const mockOnToggleAll = jest.fn();
        render(<ToggleAllCheckbox allCompleted={false} onToggleAll={mockOnToggleAll} disabled={true} />);

        const checkbox = screen.getByTestId('toggle-all-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggleAll).not.toHaveBeenCalled();
    });

    // Test 9: Clicking the label toggles the checkbox
    test('clicking the label toggles the checkbox', () => {
        const mockOnToggleAll = jest.fn();
        render(<ToggleAllCheckbox allCompleted={false} onToggleAll={mockOnToggleAll} disabled={false} />);

        const label = screen.getByText('Toggle All Input');
        fireEvent.click(label);

        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
        expect(mockOnToggleAll).toHaveBeenCalledWith(true);
    });

    // Test 10: Has correct ARIA attributes
    test('has correct ARIA attributes', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} />);
        const checkbox = screen.getByTestId('toggle-all-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', 'Toggle all todos');
    });

    // Test 11: The label is correctly associated with the checkbox
    test('label is correctly associated with the checkbox', () => {
        render(<ToggleAllCheckbox onToggleAll={() => {}} />);
        const label = screen.getByText('Toggle All Input');
        const checkbox = screen.getByTestId('toggle-all-checkbox');

        expect(label).toHaveAttribute('for', 'toggle-all-checkbox');
        expect(checkbox).toHaveAttribute('id', 'toggle-all-checkbox');
    });
});