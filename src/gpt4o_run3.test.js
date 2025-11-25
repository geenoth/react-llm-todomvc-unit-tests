import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoLabel } from "./08_TodoLabel";

describe("08_TodoLabel Component", () => {
    const mockOnEdit = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders with default props", () => {
        render(<TodoLabel />);
        const label = screen.getByTestId("todo-label");

        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent("");
        expect(label).toHaveAttribute("role", "button");
        expect(label).toHaveAttribute("tabIndex", "0");
    });

    test("renders with the provided title", () => {
        const title = "Test Title";
        render(<TodoLabel title={title} />);
        const label = screen.getByTestId("todo-label");

        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent(title);
    });

    test("does not call onEdit if not provided", () => {
        render(<TodoLabel title="No Edit Function" todoId={1} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);

        expect(mockOnEdit).not.toHaveBeenCalled();
    });

    test("calls onEdit with the correct todoId on double-click", () => {
        const todoId = 100;
        render(<TodoLabel title="Editable Todo" onEdit={mockOnEdit} todoId={todoId} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);

        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(todoId);
    });

    test("handles multiple double-clicks on the label", () => {
        const todoId = 55;
        render(<TodoLabel title="Multiple Clicks" onEdit={mockOnEdit} todoId={todoId} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);
        fireEvent.doubleClick(label);

        expect(mockOnEdit).toHaveBeenCalledTimes(2);
        expect(mockOnEdit).toHaveBeenCalledWith(todoId);
    });

    test("is focusable and has correct accessibility attributes", () => {
        render(<TodoLabel title="Accessible Todo" />);
        const label = screen.getByTestId("todo-label");

        expect(label).toHaveAttribute("role", "button");
        expect(label).toHaveAttribute("tabIndex", "0");
    });
});