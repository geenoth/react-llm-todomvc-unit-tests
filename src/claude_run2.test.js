/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel', () => {
    describe('rendering', () => {
        it('should render the label element', () => {
            render(<TodoLabel />);
            const label = screen.getByTestId('todo-label');
            expect(label).toBeInTheDocument();
        });

        it('should render with the provided title', () => {
            render(<TodoLabel title="Test Todo" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('Test Todo');
        });

        it('should render with empty title by default', () => {
            render(<TodoLabel />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('');
        });

        it('should have role="button" attribute', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveAttribute('role', 'button');
        });

        it('should have tabIndex={0} attribute', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveAttribute('tabIndex', '0');
        });

        it('should have data-testid attribute', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveAttribute('data-testid', 'todo-label');
        });
    });

    describe('props', () => {
        it('should accept title prop', () => {
            render(<TodoLabel title="My Todo Item" />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent('My Todo Item');
        });

        it('should accept onEdit prop as a function', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test" onEdit={onEdit} todoId={1} />);
            expect(screen.getByTestId('todo-label')).toBeInTheDocument();
        });

        it('should accept todoId prop', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test" onEdit={onEdit} todoId={42} />);
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenCalledWith(42);
        });

        it('should handle undefined title gracefully', () => {
            render(<TodoLabel title={undefined} />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('');
        });

        it('should render different titles correctly', () => {
            const { rerender } = render(<TodoLabel title="First Title" />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent('First Title');

            rerender(<TodoLabel title="Second Title" />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent('Second Title');
        });
    });

    describe('user interactions', () => {
        it('should call onEdit with todoId on double click', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test Todo" onEdit={onEdit} todoId={123} />);
            
            const label = screen.getByTestId('todo-label');
            fireEvent.doubleClick(label);
            
            expect(onEdit).toHaveBeenCalledTimes(1);
            expect(onEdit).toHaveBeenCalledWith(123);
        });

        it('should not throw error when onEdit is not provided and double clicked', () => {
            render(<TodoLabel title="Test Todo" todoId={1} />);
            const label = screen.getByTestId('todo-label');
            
            expect(() => {
                fireEvent.doubleClick(label);
            }).not.toThrow();
        });

        it('should not call onEdit if onEdit is undefined', () => {
            render(<TodoLabel title="Test Todo" todoId={1} />);
            const label = screen.getByTestId('todo-label');
            
            fireEvent.doubleClick(label);
            // No error should be thrown and nothing should happen
        });

        it('should handle multiple double clicks', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test Todo" onEdit={onEdit} todoId={5} />);
            
            const label = screen.getByTestId('todo-label');
            fireEvent.doubleClick(label);
            fireEvent.doubleClick(label);
            fireEvent.doubleClick(label);
            
            expect(onEdit).toHaveBeenCalledTimes(3);
        });

        it('should pass correct todoId on each double click', () => {
            const onEdit = jest.fn();
            const { rerender } = render(<TodoLabel title="Test" onEdit={onEdit} todoId={1} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenLastCalledWith(1);
            
            rerender(<TodoLabel title="Test" onEdit={onEdit} todoId={2} />);
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenLastCalledWith(2);
        });

        it('should not call onEdit on single click', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test Todo" onEdit={onEdit} todoId={1} />);
            
            const label = screen.getByTestId('todo-label');
            fireEvent.click(label);
            
            expect(onEdit).not.toHaveBeenCalled();
        });

        it('should be focusable via keyboard', () => {
            render(<TodoLabel title="Test Todo" />);
            const label = screen.getByTestId('todo-label');
            
            label.focus();
            expect(label).toHaveFocus();
        });
    });

    describe('callback memoization', () => {
        it('should handle onEdit prop changes correctly', () => {
            const onEdit1 = jest.fn();
            const onEdit2 = jest.fn();
            
            const { rerender } = render(<TodoLabel title="Test" onEdit={onEdit1} todoId={1} />);
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit1).toHaveBeenCalledWith(1);
            expect(onEdit2).not.toHaveBeenCalled();
            
            rerender(<TodoLabel title="Test" onEdit={onEdit2} todoId={1} />);
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit2).toHaveBeenCalledWith(1);
        });

        it('should handle todoId prop changes correctly', () => {
            const onEdit = jest.fn();
            
            const { rerender } = render(<TodoLabel title="Test" onEdit={onEdit} todoId={1} />);
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenLastCalledWith(1);
            
            rerender(<TodoLabel title="Test" onEdit={onEdit} todoId={999} />);
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenLastCalledWith(999);
        });
    });

    describe('edge cases', () => {
        it('should handle todoId of 0', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test" onEdit={onEdit} todoId={0} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenCalledWith(0);
        });

        it('should handle negative todoId', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test" onEdit={onEdit} todoId={-1} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenCalledWith(-1);
        });

        it('should handle string todoId', () => {
            const onEdit = jest.fn();
            render(<TodoLabel title="Test" onEdit={onEdit} todoId="abc-123" />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(onEdit).toHaveBeenCalledWith("abc-123");
        });

        it('should handle empty string title', () => {
            render(<TodoLabel title="" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('');
        });

        it('should handle special characters in title', () => {
            render(<TodoLabel title="<script>alert('xss')</script>" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent("<script>alert('xss')</script>");
        });

        it('should handle very long title', () => {
            const longTitle = 'A'.repeat(1000);
            render(<TodoLabel title={longTitle} />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent(longTitle);
        });

        it('should handle undefined onEdit gracefully', () => {
            render(<TodoLabel title="Test" onEdit={undefined} todoId={1} />);
            const label = screen.getByTestId('todo-label');
            
            expect(() => {
                fireEvent.doubleClick(label);
            }).not.toThrow();
        });

        it('should handle null onEdit gracefully', () => {
            render(<TodoLabel title="Test" onEdit={null} todoId={1} />);
            const label = screen.getByTestId('todo-label');
            
            expect(() => {
                fireEvent.doubleClick(label);
            }).not.toThrow();
        });
    });

    describe('accessibility', () => {
        it('should be accessible by role button', () => {
            render(<TodoLabel title="Accessible Todo" />);
            const button = screen.getByRole('button');
            expect(button).toBeInTheDocument();
            expect(button).toHaveTextContent('Accessible Todo');
        });

        it('should have proper tabIndex for keyboard navigation', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label.tabIndex).toBe(0);
        });
    });
});