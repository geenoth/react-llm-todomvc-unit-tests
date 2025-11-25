import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoList } from "./05_TodoList";

describe("TodoList Component", () => {
    const mockRenderItem = jest.fn();

    test("renders an empty list when no todos are provided", () => {
        const { getByTestId } = render(
            <TodoList todos={[]} renderItem={mockRenderItem} />
        );
        const list = getByTestId("todo-list");
        expect(list).toBeInTheDocument();
        expect(list).toBeEmptyDOMElement();
    });

    test("renders the correct number of todo items", () => {
        const todos = [
            { id: 1, completed: false, text: "First todo" },
            { id: 2, completed: true, text: "Second todo" },
        ];
        render(<TodoList todos={todos} renderItem={(todo) => todo.text} />);
        todos.forEach((todo) => {
            const item = screen.getByTestId(`todo-item-${todo.id}`);
            expect(item).toBeInTheDocument();
            expect(item).toHaveTextContent(todo.text);
        });
        expect(screen.getAllByRole("listitem")).toHaveLength(todos.length);
    });

    test("applies the 'completed' class to completed todos", () => {
        const todos = [
            { id: 1, completed: false, text: "Incomplete todo" },
            { id: 2, completed: true, text: "Completed todo" },
        ];
        render(
            <TodoList
                todos={todos}
                renderItem={(todo) => `${todo.text}`}
            />
        );

        const incompleteItem = screen.getByTestId("todo-item-1");
        const completedItem = screen.getByTestId("todo-item-2");

        expect(incompleteItem).not.toHaveClass("completed");
        expect(completedItem).toHaveClass("completed");
    });

    test("calls renderItem for each todo item", () => {
        const todos = [
            { id: 1, completed: false, text: "First todo" },
            { id: 2, completed: true, text: "Second todo" },
        ];

        render(
            <TodoList
                todos={todos}
                renderItem={(todo) => <span>{todo.text}</span>}
            />
        );

        todos.forEach((todo, index) =>
            expect(screen.getByTestId(`todo-item-${todo.id}`)).toBeInTheDocument()
        );
    });

    test("passes the correct arguments to renderItem for each item", () => {
        const todos = [
            { id: 1, completed: false, text: "First todo" },
            { id: 2, completed: true, text: "Second todo" },
        ];

        render(
            <TodoList
                todos={todos}
                renderItem={mockRenderItem}
            />
        );

        todos.forEach((todo, index) => {
            expect(mockRenderItem).toHaveBeenCalledWith(todo, index);
        });
    });

    test("renders the list with the correct class name", () => {
        const { getByTestId } = render(
            <TodoList todos={[]} renderItem={mockRenderItem} />
        );
        const list = getByTestId("todo-list");
        expect(list).toHaveClass("todo-list");
    });
});