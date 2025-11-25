import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TodoList } from './05_TodoList';

describe('TodoList', () => {
    const mockRenderItem = jest.fn((todo, index) => (
        <div>
            {todo.text} - Index: {index}
        </div>
    ));

    const mockTodos = [
        { id: 1, text: 'First todo', completed: false },
        { id: 2, text: 'Second todo', completed: true },
        { id: 3, text: 'Third todo', completed: false }
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders empty list when no todos provided', () => {
        render(<TodoList renderItem={mockRenderItem} />);
        
        const list = screen.getByTestId('todo-list');
        expect(list).toBeInTheDocument();
        expect(list).toHaveClass('todo-list');
        expect(list.children).toHaveLength(0);
    });

    test('renders empty list when todos is empty array', () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        
        const list = screen.getByTestId('todo-list');
        expect(list).toBeInTheDocument();
        expect(list.children).toHaveLength(0);
    });

    test('renders all todos', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        const list = screen.getByTestId('todo-list');
        expect(list.children).toHaveLength(3);
        
        mockTodos.forEach((todo) => {
            const item = screen.getByTestId(`todo-item-${todo.id}`);
            expect(item).toBeInTheDocument();
        });
    });

    test('applies completed class to completed todos', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        const firstTodo = screen.getByTestId('todo-item-1');
        const secondTodo = screen.getByTestId('todo-item-2');
        const thirdTodo = screen.getByTestId('todo-item-3');
        
        expect(firstTodo).not.toHaveClass('completed');
        expect(secondTodo).toHaveClass('completed');
        expect(thirdTodo).not.toHaveClass('completed');
    });

    test('calls renderItem for each todo with correct arguments', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        expect(mockRenderItem).toHaveBeenCalledTimes(3);
        expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[0], 0);
        expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[1], 1);
        expect(mockRenderItem).toHaveBeenCalledWith(mockTodos[2], 2);
    });

    test('renders content from renderItem function', () => {
        render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        expect(screen.getByText('First todo - Index: 0')).toBeInTheDocument();
        expect(screen.getByText('Second todo - Index: 1')).toBeInTheDocument();
        expect(screen.getByText('Third todo - Index: 2')).toBeInTheDocument();
    });

    test('handles todos without renderItem prop', () => {
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
        
        expect(() => {
            render(<TodoList todos={mockTodos} />);
        }).toThrow();
        
        consoleSpy.mockRestore();
    });

    test('renders with single todo', () => {
        const singleTodo = [{ id: 99, text: 'Single todo', completed: false }];
        
        render(<TodoList todos={singleTodo} renderItem={mockRenderItem} />);
        
        const list = screen.getByTestId('todo-list');
        expect(list.children).toHaveLength(1);
        
        const item = screen.getByTestId('todo-item-99');
        expect(item).toBeInTheDocument();
        expect(item).not.toHaveClass('completed');
        
        expect(mockRenderItem).toHaveBeenCalledTimes(1);
        expect(mockRenderItem).toHaveBeenCalledWith(singleTodo[0], 0);
    });

    test('uses todo.id as key for list items', () => {
        const { container } = render(<TodoList todos={mockTodos} renderItem={mockRenderItem} />);
        
        const listItems = container.querySelectorAll('li');
        expect(listItems).toHaveLength(3);
        
        // React uses keys internally, we can't directly test them
        // But we can verify that items render correctly with unique test ids
        mockTodos.forEach((todo) => {
            expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument();
        });
    });

    test('handles complex renderItem function', () => {
        const complexRenderItem = jest.fn((todo) => (
            <div>
                <span>{todo.text}</span>
                <button>Delete</button>
                <input type="checkbox" defaultChecked={todo.completed} />
            </div>
        ));
        
        render(<TodoList todos={mockTodos} renderItem={complexRenderItem} />);
        
        expect(complexRenderItem).toHaveBeenCalledTimes(3);
        expect(screen.getAllByText('Delete')).toHaveLength(3);
        expect(screen.getAllByRole('checkbox')).toHaveLength(3);
    });
});