import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoList } from './05_TodoList';
import '@testing-library/jest-dom';

describe('TodoList Component', () => {

    // Mock data for testing
    const mockTodos = [
        { id: 1, text: 'Learn Jest', completed: false },
        { id: 2, text: 'Write tests', completed: true },
        { id: 3, text: 'Ship it', completed: false },
    ];

    // Mock renderItem function
    const mockRenderItem = jest.fn((todo) => <span data-testid={`render-item-content-${todo.id}`}>{todo.text}</span>);

    beforeEach(() => {
        // Clear mock function calls before each test
        mockRenderItem.mockClear();
    });

    test('should render the ul element with the correct data-testid', () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        const listElement = screen.getByTestId('todo-list');
        expect(listElement).toBeInTheDocument();
        expect(listElement.tagName).toBe('UL');
    });

    test('should render an empty list when the "todos" prop is not provided (uses default)', () => {
        render(<TodoList renderItem={mockRenderItem} />);
        const listElement = screen.getByTestId('todo-list');
        expect(listElement.children.length).toBe(0);
    });

    test('should render an empty list when the "todos" prop is an empty array', () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        const listItems = screen.queryAllByRole('listitem');
        expect(listItems.length).toBe(0);
    });

    test('should render the correct number of todo items', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        const listItems = screen.getAllByRole('listitem');
        expect(listItems.length).toBe(mockTodos.length);
    });

    test('should assign a unique key and data-testid to each todo item', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        mockTodos.forEach(todo => {
            const todoItem = screen.getByTestId(`todo-item-${todo.id}`);
            expect(todoItem).toBeInTheDocument();
        });
    });

    test('should apply the "completed" class to completed todo items', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        const completedTodo = mockTodos.find(t => t.completed);
        const inProgressTodo = mockTodos.find(t => !t.completed);

        if (completedTodo) {
            const completedItem = screen.getByTestId(`todo-item-${completedTodo.id}`);
            expect(completedItem).toHaveClass('completed');
        }

        if (inProgressTodo) {
            const inProgressItem = screen.getByTestId(`todo-item-${inProgressTodo.id}`);
            expect(inProgressItem).not.toHaveClass('completed');
        }
    });

    test('should call the renderItem function for each todo', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        expect(mockRenderItem).toHaveBeenCalledTimes(mockTodos.length);
    });

    test('should call renderItem with the correct arguments (todo object and index)', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        mockTodos.forEach((todo, index) => {
            expect(mockRenderItem).toHaveBeenCalledWith(todo, index);
        });
    });

    test('should render the content returned by the renderItem function inside each li', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        mockTodos.forEach(todo => {
            const todoItem = screen.getByTestId(`todo-item-${todo.id}`);
            const renderedContent = screen.getByTestId(`render-item-content-${todo.id}`);
            expect(todoItem).toContainElement(renderedContent);
            expect(renderedContent).toHaveTextContent(todo.text);
        });
    });
});