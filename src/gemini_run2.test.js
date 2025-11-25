import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoItemCheckbox } from './06_TodoItemCheckbox';

describe('TodoItemCheckbox', () => {
    const mockOnToggle = jest.fn();
    const todoId = 123;

    beforeEach(() => {
        // Clear mock history before each test
        mockOnToggle.mockClear();
    });

    test('renders the checkbox input', () => {
        render(<TodoItemCheckbox onToggle={mockOnToggle} todoId={todoId} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveAttribute('type', 'checkbox');
    });

    test('displays as unchecked when completed prop is false', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={todoId} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).not.toBeChecked();
    });

    test('displays as checked when completed prop is true', () => {
        render(<TodoItemCheckbox completed={true} onToggle={mockOnToggle} todoId={todoId} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toBeChecked();
    });

    test('calls onToggle with the correct todoId when clicked', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={todoId} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');
        
        fireEvent.click(checkbox);
        
        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(todoId);
    });

    test('calls onToggle with the correct todoId when its state changes', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={todoId} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');

        // fireEvent.change is more semantic for inputs
        fireEvent.change(checkbox, { target: { checked: true } });

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(todoId);
    });

    test('has the correct aria-label when not completed', () => {
        render(<TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={todoId} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', `Mark todo ${todoId} as complete`);
    });

    test('has the correct aria-label when completed', () => {
        render(<TodoItemCheckbox completed={true} onToggle={mockOnToggle} todoId={todoId} />);
        const checkbox = screen.getByTestId('todo-item-checkbox');
        expect(checkbox).toHaveAttribute('aria-label', `Mark todo ${todoId} as incomplete`);
    });

    test('onToggle callback is not affected by re-renders with different props', () => {
        const { rerender } = render(
            <TodoItemCheckbox completed={false} onToggle={mockOnToggle} todoId={todoId} />
        );
        
        // Rerender with a different 'completed' prop, but same onToggle and todoId
        // This ensures useCallback is working correctly and the function reference is stable
        rerender(<TodoItemCheckbox completed={true} onToggle={mockOnToggle} todoId={todoId} />);

        const checkbox = screen.getByTestId('todo-item-checkbox');
        fireEvent.click(checkbox);

        expect(mockOnToggle).toHaveBeenCalledTimes(1);
        expect(mockOnToggle).toHaveBeenCalledWith(todoId);
    });
});