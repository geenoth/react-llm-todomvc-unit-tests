import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TodoItemCheckbox } from "./06_TodoItemCheckbox";

describe("TodoItemCheckbox Component", () => {
    let onToggleMock;

    beforeEach(() => {
        onToggleMock = jest.fn();
    });

    test("renders correctly with default props", () => {
        const { getByTestId } = render(
            <TodoItemCheckbox todoId={1} onToggle={onToggleMock} />
        );
        const checkbox = getByTestId("todo-item-checkbox");
        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toHaveClass("toggle");
        expect(checkbox).toHaveAttribute("type", "checkbox");
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveAttribute(
            "aria-label",
            "Mark todo 1 as complete"
        );
    });

    test("renders as checked when completed is true", () => {
        const { getByTestId } = render(
            <TodoItemCheckbox todoId={2} completed={true} onToggle={onToggleMock} />
        );
        const checkbox = getByTestId("todo-item-checkbox");
        expect(checkbox).toBeChecked();
        expect(checkbox).toHaveAttribute(
            "aria-label",
            "Mark todo 2 as incomplete"
        );
    });

    test("renders as unchecked when completed is false", () => {
        const { getByTestId } = render(
            <TodoItemCheckbox todoId={3} completed={false} onToggle={onToggleMock} />
        );
        const checkbox = getByTestId("todo-item-checkbox");
        expect(checkbox).not.toBeChecked();
        expect(checkbox).toHaveAttribute(
            "aria-label",
            "Mark todo 3 as complete"
        );
    });

    test("calls onToggle with todoId when clicked", () => {
        const { getByTestId } = render(
            <TodoItemCheckbox todoId={4} onToggle={onToggleMock} />
        );
        const checkbox = getByTestId("todo-item-checkbox");
        fireEvent.click(checkbox);
        expect(onToggleMock).toHaveBeenCalledTimes(1);
        expect(onToggleMock).toHaveBeenCalledWith(4);
    });

    test("updates checked state correctly", () => {
        const { getByTestId, rerender } = render(
            <TodoItemCheckbox todoId={5} completed={false} onToggle={onToggleMock} />
        );
        const checkbox = getByTestId("todo-item-checkbox");
        expect(checkbox).not.toBeChecked();

        rerender(
            <TodoItemCheckbox todoId={5} completed={true} onToggle={onToggleMock} />
        );
        expect(checkbox).toBeChecked();
    });

    test("renders with the proper class", () => {
        const { getByTestId } = render(
            <TodoItemCheckbox todoId={6} onToggle={onToggleMock} />
        );
        const checkbox = getByTestId("todo-item-checkbox");
        expect(checkbox).toHaveClass("toggle");
    });
});