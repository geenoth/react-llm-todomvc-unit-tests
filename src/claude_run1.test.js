/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
    let mockOnToggle;

    beforeEach(() => {
        mockOnToggle = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders checkbox with default unchecked state', () => {
        render(<TodoItemCheckbox onToggle={mockOnToggle} todoId="123" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('type', 'checkbox');
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveClass('toggle');
    });

    test('renders checkbox with checked state when completed is true', () => {
        render(<TodoItemCheckbox completed={true} onToggle={mockOnToggle} todoId="123" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toBeChecked();
    });

    test('renders checkbox with unchecked state when completed is false', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId="123" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).not.toBeChecked();
    });

    test('calls onToggle with todoId when checkbox is clicked', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId="123" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);
        
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith('123');
    });

    test('calls onToggle with different todoId', () => {
        render(<TodoItemCheckbox completed={true} onToggle={mockOnToggle} todoId="456" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);
        
        expect(mockOnToggle).toHaveBeenCalledWith('456');
    });

    test('has correct aria-label when unchecked', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId="789" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', 'Mark todo 789 as complete');
    });

    test('has correct aria-label when checked', () => {
        render(<TodoItemCheckbox completed={true} onToggle={mockOnToggle} todoId="789" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', 'Mark todo 789 as incomplete');
    });

    test('onChange event triggers onToggle callback', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId="999" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.change(checkbox, { target: { checked: true } });
        
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith('999');
    });

    test('multiple clicks trigger multiple onToggle calls', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId="111" />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);
        fireEvent.click(checkbox);
        fireEvent.click(checkbox);
        
        expect(mockOnToggle).toHaveBeenCalledTimes(3);
        expect(mockOnToggle).toHaveBeenCalledWith('111');
    });

    test('callback is memoized with useCallback dependencies', () => {
        const { rerender } = render(
            <TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId="222" />
        );
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        
        // Rerender with same props
        rerender(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId="222" />);
        fireEvent.click(checkbox);
        expect(mockOnToggle).toHaveBeenCalledTimes(2);
        
        // Rerender with different todoId
        const newMockOnToggle = jest.fn();
        rerender(<TodoItemCheckbox completed={false} onToggle={newMockOnToggle} todoId="333" />);
        fireEvent.click(checkbox);
        expect(newMockOnToggle).toHaveBeenCalledTimes(1);
        expect(newMockOnToggle).toHaveBeenCalledWith('333');
    });

    test('handles undefined todoId', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={undefined} />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);
        
        expect(mockOnToggle).toHaveBeenCalledWith(undefined);
        expect(checkbox).toHaveAttribute('aria-label', 'Mark todo undefined as complete');
    });

    test('handles null todoId', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={null} />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);
        
        expect(mockOnToggle).toHaveBeenCalledWith(null);
    });

    test('handles numeric todoId', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={123} />);
        
        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);
        
        expect(mockOnToggle).toHaveBeenCalledWith(123);
        expect(checkbox).toHaveAttribute('aria-label', 'Mark todo 123 as complete');
    });
});