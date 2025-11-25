import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoLabel } from "./08_TodoLabel";

describe("08_TodoLabel Component", () => {
    const mockOnEdit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with default props", () => {
        render(<TodoLabel />);
        const label = screen.getByTestId("todo-label");

        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent("");
        expect(label).toHaveAttribute("role", "button");
        expect(label).toHaveAttribute("tabindex", "0");
    });

    test("renders the title correctly when provided", () => {
        const title = "Sample Todo";
        render(<TodoLabel title={title} />);
        const label = screen.getByTestId("todo-label");

        expect(label).toHaveTextContent(title);
    });

    test("does not call onEdit when onEdit is not provided", () => {
        render(<TodoLabel todoId={1} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);

        expect(mockOnEdit).not.toHaveBeenCalled();
    });

    test("calls onEdit with todoId on double click", () => {
        const todoId = 99;
        render(<TodoLabel title="Editable Todo" onEdit={mockOnEdit} todoId={todoId} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);

        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(todoId);
    });

    test("is accessible with correct attributes", () => {
        render(<TodoLabel />);
        const label = screen.getByTestId("todo-label");

        expect(label).toHaveAttribute("role", "button");
        expect(label).toHaveAttribute("tabIndex", "0");
    });

    test("handles multiple double clicks correctly", () => {
        const todoId = 42;
        render(<TodoLabel title="Click Me" onEdit={mockOnEdit} todoId={todoId} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);
        fireEvent.doubleClick(label);

        expect(mockOnEdit).toHaveBeenCalledTimes(2);
        expect(mockOnEdit).toHaveBeenCalledWith(todoId);
    });
});