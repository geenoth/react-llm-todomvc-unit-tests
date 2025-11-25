import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from './05_TodoList';

describe('TodoList', () => {
    const mockTodos = [
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Write Jest tests', completed: true },
        { id: 3, text: 'Ship it!', completed: false },
    ];

    // A simple mock for the renderItem function prop
    const mockRenderItem = jest.fn((todo) => <span data-testid={`render-item-content-${todo.id}`}>{todo.text}</span>);

    // Clear mock history before each test
    beforeEach(() => {
        mockRenderItem.mockClear();
    });

    test('should render the list container', () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        expect(screen.getByTestId('todo-list')).toBeInTheDocument();
    });

    test('should render an empty list when the "todos" prop is not provided', () => {
        // This tests the default prop value `todos = []`
        render(<TodoList renderItem={mockRenderItem} />);
        const list = screen.getByTestId('todo-list');
        expect(list).toBeInTheDocument();
        expect(list.children.length).toBe(0);
    });

    test('should render an empty list for an empty todos array', () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        const list = screen.getByTestId('todo-list');
        expect(list.children.length).toBe(0);
    });

    test('should render all provided todo items', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        const todoItems = screen.getAllByRole('listitem');
        expect(todoItems).toHaveLength(mockTodos.length);

        mockTodos.forEach(todo => {
            // Check if each item's container is rendered
            expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument();
            // Check if the content from renderItem is present
            expect(screen.getByText(todo.text)).toBeInTheDocument();
        });
    });

    test('should apply the "completed" class to completed todo items', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        const incompleteItem = screen.getByTestId('todo-item-1');
        const completedItem = screen.getByTestId('todo-item-2');
        
        expect(incompleteItem).not.toHaveClass('completed');
        expect(completedItem).toHaveClass('completed');
    });

    test('should call the renderItem prop for each todo with correct arguments', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);

        // Check that renderItem was called for each todo
        expect(mockRenderItem).toHaveBeenCalledTimes(mockTodos.length);

        // Check the arguments for each call
        expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[0], 0);
        expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[1], 1);
        expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[2], 2);
    });

    test('should render the content returned by the renderItem function', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);

        // Verify that the specific content from our mock renderItem is in the document
        expect(screen.getByTestId('render-item-content-1')).toHaveTextContent('Learn React');
        expect(screen.getByTestId('render-item-content-2')).toHaveTextContent('Write Jest tests');
        expect(screen.getByTestId('render-item-content-3')).toHaveTextContent('Ship it!');
    });
});