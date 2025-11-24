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
        const inputElement = screen.getByTestId("add-todo-input");
        
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("type", "text");
        expect(inputElement).toHaveAttribute("data-testid", "add-todo-input");
        expect(inputElement).toHaveAttribute("placeholder", "What needs to be done?");
        expect(inputElement).toHaveClass("new-todo");
    });

    test("renders correctly with a custom placeholder", () => {
        const customPlaceholder = "Add your task here";
        render(<AddTodoInput onAddTodo={mockOnAddTodo} placeholder={customPlaceholder} />);
        const inputElement = screen.getByTestId("add-todo-input");
        
        expect(inputElement).toBeInTheDocument();
        expect(inputElement).toHaveAttribute("placeholder", customPlaceholder);
    });

    test("does not call onAddTodo if input value is empty or less than 2 characters", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId("add-todo-input");

        fireEvent.change(inputElement, { target: { value: "" } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

        fireEvent.change(inputElement, { target: { value: "a" } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    test("calls onAddTodo with sanitized input value on pressing Enter key", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId("add-todo-input");

        fireEvent.change(inputElement, { target: { value: "<script>alert('XSS')</script>" } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith("&lt;script&gt;alert(&#x27;XSS&#x27;)&lt;&#x2F;script&gt;");
        expect(inputElement.value).toBe("");
    });

    test("does not call onAddTodo when other keys are pressed", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId("add-todo-input");

        fireEvent.change(inputElement, { target: { value: "Valid Todo" } });
        fireEvent.keyDown(inputElement, { key: "a", code: "KeyA" });

        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });

    test("trims whitespace before calling onAddTodo", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId("add-todo-input");

        fireEvent.change(inputElement, { target: { value: "   New Task   " } });
        fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

        expect(mockOnAddTodo).toHaveBeenCalledTimes(1);
        expect(mockOnAddTodo).toHaveBeenCalledWith("New Task");
        expect(inputElement.value).toBe("");
    });

    test("does not alter the input if Enter key is not pressed", () => {
        render(<AddTodoInput onAddTodo={mockOnAddTodo} />);
        const inputElement = screen.getByTestId("add-todo-input");

        fireEvent.change(inputElement, { target: { value: "Do homework" } });
        fireEvent.keyDown(inputElement, { key: "Shift", code: "Shift" });
        
        expect(inputElement.value).toBe("Do homework");
        expect(mockOnAddTodo).not.toHaveBeenCalled();
    });
});