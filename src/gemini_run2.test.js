import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel', () => {
    // Test 1: Correct rendering with a given title
    test('should render the label with the correct title', () => {
        const title = 'Test Todo';
        render(<TodoLabel title={title} />);
        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent(title);
    });

    // Test 2: Renders with default empty string title
    test('should render with an empty string if no title is provided', () => {
        render(<TodoLabel />);
        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent('');
    });

    // Test 3: Calls the onEdit callback on double-click
    test('should call onEdit with the correct todoId on double-click', () => {
        const onEditMock = jest.fn();
        const todoId = 123;
        const title = 'Double-click me';

        render(<TodoLabel title={title} onEdit={onEditMock} todoId={todoId} />);
        const labelElement = screen.getByTestId('todo-label');

        fireEvent.doubleClick(labelElement);

        expect(onEditMock).toHaveBeenCalledTimes(1);
        expect(onEditMock).toHaveBeenCalledWith(todoId);
    });

    // Test 4: Does not call onEdit if it is not provided
    test('should not throw an error on double-click when onEdit is not provided', () => {
        const title = 'No callback';
        render(<TodoLabel title={title} todoId={456} />);
        const labelElement = screen.getByTestId('todo-label');

        // This test simply ensures no error is thrown during the event
        expect(() => {
            fireEvent.doubleClick(labelElement);
        }).not.toThrow();
    });

    // Test 5: Ensure accessibility attributes are present
    test('should have appropriate accessibility attributes', () => {
        render(<TodoLabel title="Accessible Todo" />);
        const labelElement = screen.getByTestId('todo-label');

        expect(labelElement).toHaveAttribute('role', 'button');
        expect(labelElement).toHaveAttribute('tabIndex', '0');
    });
});