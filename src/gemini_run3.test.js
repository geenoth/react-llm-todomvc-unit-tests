import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel', () => {
    test('should render the component with the provided title', () => {
        const title = 'My Test Todo';
        render(<TodoLabel title={title} />);
        
        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent(title);
    });

    test('should render with an empty string if no title is provided', () => {
        render(<TodoLabel />);
        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toBeInTheDocument();
        expect(labelElement).toHaveTextContent('');
    });

    test('should have appropriate accessibility attributes', () => {
        render(<TodoLabel title="Accessible Todo" />);
        const labelElement = screen.getByTestId('todo-label');
        expect(labelElement).toHaveAttribute('role', 'button');
        expect(labelElement).toHaveAttribute('tabIndex', '0');
    });

    test('should call the onEdit callback with the correct todoId on double click', () => {
        const mockOnEdit = jest.fn();
        const todoId = 'abc-123';
        const title = 'Double click me';
        
        render(<TodoLabel title={title} onEdit={mockOnEdit} todoId={todoId} />);
        
        const labelElement = screen.getByTestId('todo-label');
        fireEvent.doubleClick(labelElement);
        
        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(todoId);
    });

    test('should not call the onEdit callback on a single click', () => {
        const mockOnEdit = jest.fn();
        const todoId = 'abc-123';
        const title = 'Single click me';

        render(<TodoLabel title={title} onEdit={mockOnEdit} todoId={todoId} />);
        
        const labelElement = screen.getByTestId('todo-label');
        fireEvent.click(labelElement);
        
        expect(mockOnEdit).not.toHaveBeenCalled();
    });

    test('should not throw an error on double click if onEdit is not provided', () => {
        const todoId = 'abc-123';
        const title = 'No onEdit handler';

        render(<TodoLabel title={title} todoId={todoId} />);
        
        const labelElement = screen.getByTestId('todo-label');
        
        // This test passes if no error is thrown during the double click event
        expect(() => {
            fireEvent.doubleClick(labelElement);
        }).not.toThrow();
    });
});