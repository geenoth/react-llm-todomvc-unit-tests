/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TodoLabel } from './08_TodoLabel';

describe('TodoLabel', () => {
    describe('rendering', () => {
        it('should render a label element with data-testid', () => {
            render(<TodoLabel />);
            const label = screen.getByTestId('todo-label');
            expect(label).toBeInTheDocument();
            expect(label.tagName).toBe('LABEL');
        });

        it('should render with default empty title', () => {
            render(<TodoLabel />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('');
        });

        it('should render with provided title', () => {
            render(<TodoLabel title="Buy groceries" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveTextContent('Buy groceries');
        });

        it('should have role="button" attribute', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveAttribute('role', 'button');
        });

        it('should have tabIndex={0} for keyboard accessibility', () => {
            render(<TodoLabel title="Test" />);
            const label = screen.getByTestId('todo-label');
            expect(label).toHaveAttribute('tabIndex', '0');
        });
    });

    describe('props', () => {
        it('should accept and display different titles', () => {
            const { rerender } = render(<TodoLabel title="First title" />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent('First title');

            rerender(<TodoLabel title="Second title" />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent('Second title');
        });

        it('should accept todoId prop', () => {
            const mockOnEdit = jest.fn();
            render(<TodoLabel title="Test" todoId="123" onEdit={mockOnEdit} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(mockOnEdit).toHaveBeenCalledWith('123');
        });

        it('should work with numeric todoId', () => {
            const mockOnEdit = jest.fn();
            render(<TodoLabel title="Test" todoId={456} onEdit={mockOnEdit} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(mockOnEdit).toHaveBeenCalledWith(456);
        });
    });

    describe('user interactions', () => {
        describe('double click', () => {
            it('should call onEdit with todoId when double-clicked', () => {
                const mockOnEdit = jest.fn();
                const todoId = 'todo-1';
                
                render(<TodoLabel title="Test todo" todoId={todoId} onEdit={mockOnEdit} />);
                
                fireEvent.doubleClick(screen.getByTestId('todo-label'));
                
                expect(mockOnEdit).toHaveBeenCalledTimes(1);
                expect(mockOnEdit).toHaveBeenCalledWith(todoId);
            });

            it('should not throw error when onEdit is not provided', () => {
                render(<TodoLabel title="Test todo" todoId="123" />);
                
                expect(() => {
                    fireEvent.doubleClick(screen.getByTestId('todo-label'));
                }).not.toThrow();
            });

            it('should not call onEdit when onEdit is undefined', () => {
                render(<TodoLabel title="Test todo" todoId="123" onEdit={undefined} />);
                
                fireEvent.doubleClick(screen.getByTestId('todo-label'));
                // No error should occur and nothing should be called
            });

            it('should handle multiple double-clicks', () => {
                const mockOnEdit = jest.fn();
                render(<TodoLabel title="Test" todoId="1" onEdit={mockOnEdit} />);
                
                const label = screen.getByTestId('todo-label');
                fireEvent.doubleClick(label);
                fireEvent.doubleClick(label);
                fireEvent.doubleClick(label);
                
                expect(mockOnEdit).toHaveBeenCalledTimes(3);
            });
        });

        describe('single click', () => {
            it('should not call onEdit on single click', () => {
                const mockOnEdit = jest.fn();
                render(<TodoLabel title="Test" todoId="1" onEdit={mockOnEdit} />);
                
                fireEvent.click(screen.getByTestId('todo-label'));
                
                expect(mockOnEdit).not.toHaveBeenCalled();
            });
        });

        describe('keyboard interaction', () => {
            it('should be focusable via keyboard', () => {
                render(<TodoLabel title="Test" />);
                const label = screen.getByTestId('todo-label');
                
                label.focus();
                expect(label).toHaveFocus();
            });
        });
    });

    describe('edge cases', () => {
        it('should handle empty string title', () => {
            render(<TodoLabel title="" />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent('');
        });

        it('should handle special characters in title', () => {
            const specialTitle = '<script>alert("xss")</script>';
            render(<TodoLabel title={specialTitle} />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent(specialTitle);
        });

        it('should handle very long title', () => {
            const longTitle = 'A'.repeat(1000);
            render(<TodoLabel title={longTitle} />);
            expect(screen.getByTestId('todo-label')).toHaveTextContent(longTitle);
        });

        it('should handle undefined todoId', () => {
            const mockOnEdit = jest.fn();
            render(<TodoLabel title="Test" todoId={undefined} onEdit={mockOnEdit} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(mockOnEdit).toHaveBeenCalledWith(undefined);
        });

        it('should handle null todoId', () => {
            const mockOnEdit = jest.fn();
            render(<TodoLabel title="Test" todoId={null} onEdit={mockOnEdit} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(mockOnEdit).toHaveBeenCalledWith(null);
        });

        it('should handle object todoId', () => {
            const mockOnEdit = jest.fn();
            const objId = { id: 1, type: 'todo' };
            render(<TodoLabel title="Test" todoId={objId} onEdit={mockOnEdit} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            expect(mockOnEdit).toHaveBeenCalledWith(objId);
        });
    });

    describe('callback stability', () => {
        it('should call the latest onEdit callback after prop update', () => {
            const firstCallback = jest.fn();
            const secondCallback = jest.fn();
            
            const { rerender } = render(
                <TodoLabel title="Test" todoId="1" onEdit={firstCallback} />
            );
            
            rerender(<TodoLabel title="Test" todoId="1" onEdit={secondCallback} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            
            expect(firstCallback).not.toHaveBeenCalled();
            expect(secondCallback).toHaveBeenCalledWith('1');
        });

        it('should use updated todoId after prop change', () => {
            const mockOnEdit = jest.fn();
            
            const { rerender } = render(
                <TodoLabel title="Test" todoId="old-id" onEdit={mockOnEdit} />
            );
            
            rerender(<TodoLabel title="Test" todoId="new-id" onEdit={mockOnEdit} />);
            
            fireEvent.doubleClick(screen.getByTestId('todo-label'));
            
            expect(mockOnEdit).toHaveBeenCalledWith('new-id');
        });
    });
});