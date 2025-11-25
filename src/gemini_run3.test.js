import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
    // Test case 1: Component renders correctly with default props
    test('renders the checkbox as unchecked by default', () => {
        const mockOnToggle = jest.fn();
        const todoId = 1;

        render(<TodoItemCheckbox onToggle={mockOnToggle} todoId={todoId} />);

        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).not.toBeChecked();
    });

    // Test case 2: Component renders correctly when completed is true
    test('renders the checkbox as checked when completed prop is true', () => {
        const mockOnToggle = jest.fn();
        const todoId = 2;

        render(<TodoItemCheckbox completed={true} onToggle={mockOnToggle} todoId={todoId} />);

        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeChecked();
    });

    // Test case 3: User interaction - clicking the checkbox
    test('calls the onToggle callback with the correct todoId when clicked', () => {
        const mockOnToggle = jest.fn();
        const todoId = 3;

        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={todoId} />);

        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(todoId);
    });

    // Test case 4: Accessibility - aria-label for an incomplete todo
    test('has the correct aria-label when the todo is not completed', () => {
        const todoId = 4;
        render(<TodoItemCheckbox completed={false} onToggle={() => {}} todoId={todoId} />);

        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', `Mark todo ${todoId} as complete`);
    });

    // Test case 5: Accessibility - aria-label for a completed todo
    test('has the correct aria-label when the todo is completed', () => {
        const todoId = 5;
        render(<TodoItemCheckbox completed={true} onToggle={() => {}} todoId={todoId} />);

        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', `Mark todo ${todoId} as incomplete`);
    });

    // Test case 6: Prop changes are reflected in the component
    test('updates its checked state when the completed prop changes', () => {
        const todoId = 6;
        const { rerender } = render(<TodoItemCheckbox completed={false} onToggle={() => {}} todoId={todoId} />);

        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).not.toBeChecked();

        // Rerender the component with the 'completed' prop set to true
        rerender(<TodoItemCheckbox completed={true} onToggle={() => {}} todoId={todoId} />);

        expect(checkbox).toBeChecked();

        // Rerender the component with the 'completed' prop set to false
        rerender(<TodoItemCheckbox completed={false} onToggle={() => {}} todoId={todoId} />);

        expect(checkbox).not.toBeChecked();
    });

    // Test case 7: Ensure className is applied
    test('has the "toggle" className', () => {
        render(<TodoItemCheckbox onToggle={() => {}} todoId={7} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toHaveClass('toggle');
    });
});