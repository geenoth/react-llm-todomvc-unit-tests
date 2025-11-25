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

    test("renders correctly with default props", () => {
        const { getByTestId, getByLabelText } = render(
            <EditTodoInput onSaveEdit={onSaveEditMock} />
        );
        const input = getByTestId("edit-todo-input");
        expect(input).toBeInTheDocument();
        expect(input).toHaveAttribute("type", "text");
        expect(input).toHaveAttribute("id", "edit-todo-input");
        expect(input).toHaveAttribute("autoFocus");
        expect(input).toHaveValue("");
        expect(getByLabelText("Edit Todo Input")).toBeInTheDocument();
    });

    test("renders input with default value when defaultValue prop is provided", () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={onSaveEditMock} defaultValue="default text" />
        );
        const input = getByTestId("edit-todo-input");
        expect(input).toHaveValue("default text");
    });

    test("calls onBlur when input loses focus", () => {
        const { getByTestId } = render(
            <EditTodoInput onSaveEdit={onSaveEditMock} onBlur={onBlurMock} />
        );
        const input = getByTestId("edit-todo-input");
        fireEvent.blur(input);
        expect(onBlurMock).toHaveBeenCalledTimes(1);
    });

    test("does not call onSaveEdit when input is too short", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "A" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).not.toHaveBeenCalled();
    });

    test("calls onSaveEdit with sanitized input when Enter key is pressed", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "<script>alert('xss')</script>" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).toHaveBeenCalledTimes(1);
        expect(onSaveEditMock).toHaveBeenCalledWith(
            "&lt;script&gt;alert(&#x27;xss&#x27;)&lt;/script&gt;"
        );
    });

    test("trims whitespace from the input value before saving", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "   Valid Input   " } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).toHaveBeenCalledTimes(1);
        expect(onSaveEditMock).toHaveBeenCalledWith("Valid Input");
    });

    test("does not call onSaveEdit if Enter key is pressed with only spaces", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "     " } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).not.toHaveBeenCalled();
    });

    test("does not call onSaveEdit if Enter key is pressed and input is less than 2 characters", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "A" } });
        fireEvent.keyDown(input, { key: "Enter" });
        expect(onSaveEditMock).not.toHaveBeenCalled();
    });

    test("does not call onSaveEdit unless Enter is pressed", () => {
        const { getByTestId } = render(<EditTodoInput onSaveEdit={onSaveEditMock} />);
        const input = getByTestId("edit-todo-input");
        fireEvent.change(input, { target: { value: "Valid Input" } });
        expect(onSaveEditMock).not.toHaveBeenCalled();
    });
});