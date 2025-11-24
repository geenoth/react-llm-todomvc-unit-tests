import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddTodoInput } from "./01_AddTodoInput.jsx";

describe("AddTodoInput Component", () => {
    const mockOnAddTodo = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with default placeholder", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const input = screen.getByTestId("add-todo-input");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("placeholder", "What needs to be done?");
        expect(input).toHaveClass("new-todo");
    });

    test("renders correctly with a custom placeholder", () => {
        const customPlaceholder = "Add your task here";
        render(<AddTodoInput onAddTodo={mockOnAddTodo} placeholder={customPlaceholder} />);

        const input = screen.getByTestId("add-todo-input");
        expect(input).toHaveAttribute("placeholder", customPlaceholder);
    });

    test("does not call onAddTodo if input value is less than 2 characters", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const input = screen.getByTestId("add-todo-input");
        fireEvent.change(input, { target: { value: "a" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    test("calls onAddTodo with sanitized input value when Enter key is pressed", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const input = screen.getByTestId("add-todo-input");
        fireEvent.change(input, { target: { value: "<script>alert('XSS')</script>" } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith("&lt;script&gt;alert(&#x27;XSS&#x27;)&lt;&#x2F;script&gt;");
        expect(input.value).toBe(""); // Ensure input is cleared after addition
    });

    test("does not call onAddTodo if key other than Enter is pressed", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const input = screen.getByTestId("add-todo-input");
        fireEvent.change(input, { target: { value: "Valid Todo" } });
        fireEvent.keyDown(input, { key: "A", code: "KeyA" });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    test("trims whitespace before calling onAddTodo", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);

        const input = screen.getByTestId("add-todo-input");
        fireEvent.change(input, { target: { value: "  Valid Todo  " } });
        fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith("Valid Todo");
    });
});