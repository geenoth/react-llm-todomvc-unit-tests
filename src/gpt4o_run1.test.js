import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EditTodoInput } from "./02_EditTodoInput";

describe("EditTodoInput Component", () => {
    let onSaveEditMock;
    let onBlurMock;

    beforeEach(() => {
        onSaveEditMock = jest.fn();
        onBlurMock = jest.fn();
    });

    test("renders input with default value", () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={onSaveEditMock} defaultValue="default text" />
        );
        const input = getByTestId("edit-todo-input");
        expect(input).toBeInTheDocument();
        expect(input).toHaveValue("default text");
    });

    test("renders input with empty defaultValue when not provided", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        expect(input).toHaveValue("");
    });

    test("calls onBlur when input loses focus", () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={onSaveEditMock} onBlur={onBlurMock} />
        );
        const input = getByTestId("edit-todo-input");
        fireEvent.blur(input);
        expect(onBlurMock).toHaveBeenCalledTimes(1);
    });

    test("calls onSaveEdit with sanitized value on Enter key (valid input)", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "Valid Input" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).toHaveBeenCalledTimes(1);
        expect(onSaveEditMock).toHaveBeenCalledWith("Valid Input");
    });

    test("sanitizes input before calling onSaveEdit", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, {
            target: { value: '<script>alert("xss")</script>' },
        });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).toHaveBeenCalledWith(
            "&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;"
        );
    });

    test("does not call onSaveEdit when input is too short", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "A" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).not.toHaveBeenCalled();
    });

    test("trims input value before saving", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "   Trimmed Input  " } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).toHaveBeenCalledWith("Trimmed Input");
    });

    test("does not call onSaveEdit if Enter is pressed but input is empty", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "  " } }); // Only spaces
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).not.toHaveBeenCalled();
    });
});