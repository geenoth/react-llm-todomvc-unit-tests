import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoLabel } from './08_TodoLabel';

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

    test("renders with the provided title", () => {
        render(<TodoLabel title="Test Todo" />);
        const label = screen.getByTestId("todo-label");

        expect(label).toBeInTheDocument();
        expect(label).toHaveTextContent("Test Todo");
    });

    test("does not call onEdit when onEdit is not provided", () => {
        render(<TodoLabel todoId={1} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);

        expect(mockOnEdit).not.toHaveBeenCalled();
    });

    test("calls onEdit with the correct todoId when double-clicked", () => {
        render(<TodoLabel title="Editable Todo" onEdit={mockOnEdit} todoId={42} />);
        const label = screen.getByTestId("todo-label");

        fireEvent.doubleClick(label);

        expect(mockOnEdit).toHaveBeenCalledTimes(1);
        expect(mockOnEdit).toHaveBeenCalledWith(42);
    });

    test("has correct role and tab index for accessibility", () => {
        render(<TodoLabel />);
        const label = screen.getByTestId("todo-label");

        expect(label).toHaveAttribute("role", "button");
        expect(label).toHaveAttribute("tabIndex", "0");
    });

    test("displays dynamic titles correctly", () => {
        const title = "Dynamic Todo Title";
        render(<TodoLabel title={title} />);
        const label = screen.getByTestId("todo-label");

        expect(label).toHaveTextContent(title);
    });
});