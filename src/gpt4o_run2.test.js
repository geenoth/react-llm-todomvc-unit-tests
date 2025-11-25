import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoList } from "./05_TodoList";

describe("TodoList Component", () => {
    const mockRenderItem = jest.fn();

    test("renders without crashing and with default empty todos", () => {
        const { getByTestId } = render(
            <TodoList todos={[]} renderItem={mockRenderItem} />
        );
        const list = getByTestId("todo-list");
        expect(list).toBeInTheDocument();
        expect(list).toBeEmptyDOMElement();
    });

    test("renders the correct number of todo items", () => {
        const todos = [
            { id: 1, completed: false },
            { id: 2, completed: true },
        ];
        render(
            <TodoList
                todos={todos}
                renderItem={(todo) => <span>{`Todo ${todo.id}`}</span>}
            />
        );

        todos.forEach((todo) => {
            expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument();
            expect(screen.getByTestId(`todo-item-${todo.id}`)).toContainHTML(
                `<span>Todo ${todo.id}</span>`
            );
        });

        expect(screen.getAllByTestId(/todo-item-/)).toHaveLength(todos.length);
    });

    test("applies 'completed' class to completed todos", () => {
        const todos = [
            { id: 1, completed: false },
            { id: 2, completed: true },
        ];
        render(
            <TodoList
                todos={todos}
                renderItem={(todo) => <span>{todo.id}</span>}
            />
        );

        const incompleteItem = screen.getByTestId("todo-item-1");
        const completedItem = screen.getByTestId("todo-item-2");

        expect(incompleteItem).not.toHaveClass("completed");
        expect(completedItem).toHaveClass("completed");
    });

    test("calls renderItem with correct arguments for each todo item", () => {
        const todos = [
            { id: 1, completed: false },
            { id: 2, completed: true },
        ];
        render(<TodoList todos={todos} renderItem={mockRenderItem} />);
        todos.forEach((todo, index) => {
            expect(mockRenderItem).toHaveBeenCalledWith(todo, index);
        });
        expect(mockRenderItem).toHaveBeenCalledTimes(todos.length);
    });

    test("renders an empty list when todos prop is an empty array", () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        const list = screen.getByTestId("todo-list");
        expect(list).toBeInTheDocument();
        expect(list).toBeEmptyDOMElement();
    });

    test("list has the correct class name", () => {
        const { getByTestId } = render(
            <TodoList todos={[]} renderItem={mockRenderItem} />
        );
        const list = getByTestId("todo-list");
        expect(list).toHaveClass("todo-list");
    });

    test("renders list items with dynamic content from renderItem", () => {
        const todos = [
            { id: 1, completed: true },
            { id: 2, completed: false },
        ];
        render(
            <TodoList
                todos={todos}
                renderItem={(todo, index) => <span>{`Item ${index + 1}`}</span>}
            />
        );
        todos.forEach((todo, index) => {
            const item = screen.getByTestId(`todo-item-${todo.id}`);
            expect(item).toHaveTextContent(`Item ${index + 1}`);
        });
    });
});