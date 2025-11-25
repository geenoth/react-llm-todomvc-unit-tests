/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel', () => {
    describe('rendering', () => {
        it('should render with default empty title', () => {
            render(<TodoLabel />);
            const label = screen.getByTestId('todo-label');
            expect(label).toBeInTheDocument();
            expect(label).toHaveTextContent('');
        });

        it('should render with provided title', () => {
            render(<TodoLabel title="Test Todo" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('Test Todo');
        });

        it('should have role="button" attribute', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveAttribute('role', 'button');
        });

        it('should have tabIndex={0} for accessibility', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveAttribute('tabIndex', '0');
        });

        it('should render as a label element', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label.tagName).toBe('LABEL');
        });
    });

    describe('user interactions', () => {
        it('should call onEdit with todoId on double click', () => {
            const mockOnEdit = jest.fn();
            const todoId = 'todo-123';
            
            render(<TodoLabel title="Test" onEdit={mockOnEdit} todoId={todoId} />);
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            
            expect(mockOnEdit).toHaveBeenCalledTimes(1);
            expect(mockOnEdit).toHaveBeenCalledWith(todoId);
        });

        it('should not throw error on double click when onEdit is not provided', () => {
            render(<TodoLabel title="Test" todoId="123" />);
            const label = screen.getByTestId('todo-label');
            
            expect(() => {
                fireEvent.doubleClick(label);
            }).not.toThrow();
        });

        it('should not call onEdit on single click', () => {
            const mockOnEdit = jest.fn();
            
            render(<TodoLabel title="Test" onEdit={mockOnEdit} todoId="123" />);
            const label = screen.getByTestId('todo-label');
            
            fireEvent.click(label);
            
            expect(mockOnEdit).not.toHaveBeenCalled();
        });

        it('should handle multiple double clicks', () => {
            const mockOnEdit = jest.fn();
            const todoId = 'todo-456';
            
            render(<TodoLabel title="Test" onEdit={mockOnEdit} todoId={todoId} />);
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            fireEvent.doubleClick(label);
            fireEvent.doubleClick(label);
            
            expect(mockOnEdit).toHaveBeenCalledTimes(3);
        });
    });

    describe('props handling', () => {
        it('should update title when prop changes', () => {
            const { rerender } = render(<TodoLabel title="Initial Title" />);
            const label = screen.getByTestId('todo-label');
            
            expect(label).toHaveTextContent('Initial Title');
            
            rerender(<TodoLabel title="Updated Title" />);
            
            expect(label).toHaveTextContent('Updated Title');
        });

        it('should handle undefined title prop', () => {
            render(<TodoLabel title={undefined} />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('');
        });

        it('should handle numeric todoId', () => {
            const mockOnEdit = jest.fn();
            const todoId = 42;
            
            render(<TodoLabel title="Test" onEdit={mockOnEdit} todoId={todoId} />);
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            
            expect(mockOnEdit).toHaveBeenCalledWith(42);
        });

        it('should handle string todoId', () => {
            const mockOnEdit = jest.fn();
            const todoId = 'string-id';
            
            render(<TodoLabel title="Test" onEdit={mockOnEdit} todoId={todoId} />);
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            
            expect(mockOnEdit).toHaveBeenCalledWith('string-id');
        });

        it('should handle undefined todoId', () => {
            const mockOnEdit = jest.fn();
            
            render(<TodoLabel title="Test" onEdit={mockOnEdit} />);
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            
            expect(mockOnEdit).toHaveBeenCalledWith(undefined);
        });

        it('should handle onEdit prop change', () => {
            const mockOnEdit1 = jest.fn();
            const mockOnEdit2 = jest.fn();
            const todoId = 'test-id';
            
            const { rerender } = render(
                <TodoLabel title="Test" onEdit={mockOnEdit1} todoId={todoId} />
            );
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            expect(mockOnEdit1).toHaveBeenCalledTimes(1);
            
            rerender(<TodoLabel title="Test" onEdit={mockOnEdit2} todoId={todoId} />);
            
            fireEvent.doubleClick(label);
            expect(mockOnEdit2).toHaveBeenCalledTimes(1);
            expect(mockOnEdit1).toHaveBeenCalledTimes(1);
        });

        it('should handle todoId prop change', () => {
            const mockOnEdit = jest.fn();
            
            const { rerender } = render(
                <TodoLabel title="Test" onEdit={mockOnEdit} todoId="id-1" />
            );
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            expect(mockOnEdit).toHaveBeenLastCalledWith('id-1');
            
            rerender(<TodoLabel title="Test" onEdit={mockOnEdit} todoId="id-2" />);
            
            fireEvent.doubleClick(label);
            expect(mockOnEdit).toHaveBeenLastCalledWith('id-2');
        });
    });

    describe('edge cases', () => {
        it('should handle empty string title', () => {
            render(<TodoLabel title="" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('');
        });

        it('should handle title with special characters', () => {
            const specialTitle = '<script>alert("xss")</script>';
            render(<TodoLabel title={specialTitle} />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent(specialTitle);
        });

        it('should handle very long title', () => {
            const longTitle = 'A'.repeat(1000);
            render(<TodoLabel title={longTitle} />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent(longTitle);
        });

        it('should handle title with whitespace', () => {
            render(<TodoLabel title="   spaced title   " />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('spaced title');
        });

        it('should handle null onEdit gracefully', () => {
            render(<TodoLabel title="Test" onEdit={null} todoId="123" />);
            const label = screen.getByTestId('todo-label');
            
            expect(() => {
                fireEvent.doubleClick(label);
            }).not.toThrow();
        });
    });

    describe('accessibility', () => {
        it('should be focusable via tab', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            
            label.focus();
            expect(document.activeElement).toBe(label);
        });

        it('should have proper semantic attributes', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByRole('button');
            expect(label).toBeInTheDocument();
        });
    });
});