import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DestroyButton } from "./03_DestroyButton";

describe("DestroyButton Component", () => {
    let onDestroyMock;

    beforeEach(() => {
        onDestroyMock = jest.fn();
    });

    test("renders correctly with the provided todoId", () => {
        const { getByTestId } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={123} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Delete todo 123");
    });

    test("renders with a dynamic aria-label for different todoId values", () => {
        const { getByTestId, rerender } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={1} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toHaveAttribute("aria-label", "Delete todo 1");

        rerender(<DestroyButton onDestroy={onDestroyMock} todoId={456} />);
        expect(button).toHaveAttribute("aria-label", "Delete todo 456");
    });

    test("calls onDestroy with the correct todoId when clicked", () => {
        const { getByTestId } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={42} />
        );
        const button = getByTestId("destroy-button");
        fireEvent.click(button);
        expect(onDestroyMock).toHaveBeenCalledTimes(1);
        expect(onDestroyMock).toHaveBeenCalledWith(42);
    });

    test("does not call onDestroy without a click", () => {
        render(<DestroyButton onDestroy={onDestroyMock} todoId={5} />);
        expect(onDestroyMock).not.toHaveBeenCalled();
    });

    test("button has the correct class for styling", () => {
        const { getByTestId } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={10} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toHaveClass("destroy");
    });
});