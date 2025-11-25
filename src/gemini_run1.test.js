import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel', () => {
    // Test 1: Correct rendering with a given title
    test('renders the label with the provided title', () => {
        const title = 'My Test Todo';
        render(<TodoLabel title={title} />);
        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent(title);
    });

    // Test 2: Correct rendering with default title prop
    test('renders with an empty string if no title is provided', () => {
        render(<TodoLabel />);
        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent('');
    });

    // Test 3: User interaction - double click triggers onEdit
    test('calls onEdit with the correct todoId on double click', () => {
        const mockOnEdit = jest.fn();
        const todoId = 123;
        const title = 'Double click me';

        render(<TodoLabel title={title} onEdit={mockOnEdit} todoId={todoId} />);
        const labelElement = screen.getByTestId('todo-label');

        fireEvent.doubleClick(labelElement);

        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(todoId);
    });

    // Test 4: User interaction - double click does nothing if onEdit is not provided
    test('does not throw an error on double click when onEdit is not provided', () => {
        const title = 'No onEdit handler';
        render(<TodoLabel title={title} todoId={456} />);
        const labelElement = screen.getByTestId('todo-label');

        // This should not throw an error
        expect(() => fireEvent.doubleClick(labelElement)).not.toThrow();
    });

    // Test 5: Prop changes - ensure component updates with new title
    test('updates the displayed title when the title prop changes', () => {
        const initialTitle = 'Initial Title';
        const updatedTitle = 'Updated Title';
        const { rerender } = render(<TodoLabel title={initialTitle} />);

        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toHaveTextContent(initialTitle);

        rerender(<TodoLabel title={updatedTitle} />);
        expect(labelElement).toHaveTextContent(updatedTitle);
    });

    // Test 6: Accessibility attributes are present
    test('has appropriate accessibility attributes', () => {
        render(<TodoLabel title="Accessible Todo" />);
        const labelElement = screen.getByTestId('todo-label');

        expect(labelElement).toHaveAttribute('role', 'button');
        expect(labelElement).toHaveAttribute('tabIndex', '0');
    });
});