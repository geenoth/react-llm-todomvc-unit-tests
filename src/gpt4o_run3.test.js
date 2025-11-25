import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoList } from "./05_TodoList";

describe("TodoList Component", () => {
    const mockRenderItem = jest.fn();

    test("renders the component without crashing and with empty todos", () => {
        const { getByTestId } = render(
            <TodoList todos={[]} renderItem={mockRenderItem} />
        );
        const list = getByTestId("todo-list");
        expect(list).toBeInTheDocument();
        expect(list).toBeEmptyDOMElement();
        expect(mockRenderItem).not.toHaveBeenCalled();
    });

    test("renders the correct number of todo items", () => {
        const todos = [
            { id: 1, completed: false, text: "First todo" },
            { id: 2, completed: true, text: "Second todo" },
        ];
        render(<TodoList todos={todos} renderItem={(todo) => <span>{todo.text}</span>} />);

        todos.forEach((todo) => {
            const item = screen.getByTestId(`todo-item-${todo.id}`);
            expect(item).toBeInTheDocument();
            expect(item).toHaveTextContent(todo.text);
        });

        expect(screen.getAllByRole("listitem")).toHaveLength(todos.length);
    });

    test("applies 'completed' class to completed todo items", () => {
        const todos = [
            { id: 1, completed: false, text: "Incomplete todo" },
            { id: 2, completed: true, text: "Completed todo" },
        ];
        render(
            <TodoList todos={todos} renderItem={(todo) => <span>{todo.text}</span>} />
        );

        const incompleteItem = screen.getByTestId("todo-item-1");
        const completedItem = screen.getByTestId("todo-item-2");

        expect(incompleteItem).not.toHaveClass("completed");
        expect(completedItem).toHaveClass("completed");
    });

    test("calls renderItem with the correct arguments for each todo", () => {
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

    test("renders an empty list if todos is an empty array", () => {
        render(<TodoList todos={[]} renderItem={mockRenderItem} />);
        const list = screen.getByTestId("todo-list");
        expect(list).toBeInTheDocument();
        expect(list).toBeEmptyDOMElement();
    });

    test("properly renders items based on renderItem function", () => {
        const todos = [
            { id: 1, completed: false },
            { id: 2, completed: true },
        ];
        render(
            <TodoList
                todos={todos}
                renderItem={(todo, index) => <div>{`Todo ${index}`}</div>}
            />
        );

        todos.forEach((todo, index) => {
            const item = screen.getByTestId(`todo-item-${todo.id}`);
            expect(item).toHaveTextContent(`Todo ${index}`);
        });
    });

    test("applies the 'todo-list' class to the list", () => {
        const { getByTestId } = render(
            <TodoList todos={[]} renderItem={mockRenderItem} />
        );
        const list = getByTestId("todo-list");
        expect(list).toHaveClass("todo-list");
    });
});