import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from './05_TodoList';

describe('TodoList UI component', () => {
    const mockTodos = [
        { id: 1, text: 'First todo', completed: false },
        { id: 2, text: 'Second todo', completed: true },
        { id: 3, text: 'Third todo', completed: false },
    ];

    const mockRenderItem = jest.fn((todo) => <span data-testid={`render-item-${todo.id}`}>{todo.text}</span>);

    beforeEach(() => {
        // Clear mock calls before each test
        mockRenderItem.mockClear();
    });

    test('should render an empty list when no todos are provided', () => {
        render(<TodoList renderItem={mockRenderItem} />);
        const list = screen.getByTestId('todo-list');
        expect(list).toBeInTheDocument();
        // queryByRole is used because it returns null if not found, instead of throwing an error
        const items = screen.queryAllByRole('listitem');
        expect(items).toHaveLength(0);
    });

    test('should render an empty list for an empty todos array', () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        const list = screen.getByTestId('todo-list');
        expect(list).toBeInTheDocument();
        const items = screen.queryAllByRole('listitem');
        expect(items).toHaveLength(0);
    });

    test('should render a list of todos', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        const items = screen.getAllByRole('listitem');
        expect(items).toHaveLength(mockTodos.length);
    });

    test('should use the provided data-testid attributes for list and items', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        expect(screen.getByTestId('todo-list')).toBeInTheDocument();
        mockTodos.forEach(todo => {
            expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument();
        });
    });

    test('should call renderItem for each todo with correct arguments', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);

        expect(mockRenderItem).toHaveBeenCalledTimes(mockTodos.length);

        // Check call arguments for each todo
        mockTodos.forEach((todo, index) => {
            expect(mockRenderItem).toHaveBeenCalledWith(todo, index);
        });
    });

    test('should render the content returned by renderItem for each todo', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        mockTodos.forEach(todo => {
            // Check that the content from our mock renderItem is present
            expect(screen.getByTestId(`render-item-${todo.id}`)).toBeInTheDocument();
            expect(screen.getByText(todo.text)).toBeInTheDocument();
        });
    });

    test('should apply the "completed" class to completed todo items', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);

        const completedTodo = mockTodos.find(t => t.completed);
        const incompleteTodo = mockTodos.find(t => !t.completed);

        if (completedTodo) {
            const completedItem = screen.getByTestId(`todo-item-${completedTodo.id}`);
            expect(completedItem).toHaveClass('completed');
        }

        if (incompleteTodo) {
            const incompleteItem = screen.getByTestId(`todo-item-${incompleteTodo.id}`);
            expect(incompleteItem).not.toHaveClass('completed');
        }
    });

    test('should use todo.id as the key for each list item', () => {
        // This test is more conceptual for React's internal workings.
        // We can verify it by ensuring the component renders without key warnings in the console.
        // Running the test suite will show console warnings if keys are missing or incorrect.
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        expect(consoleErrorSpy).not.toHaveBeenCalledWith(
            expect.stringContaining('Warning: Each child in a list should have a unique "key" prop.')
        );
        
        consoleErrorSpy.mockRestore();
    });
});