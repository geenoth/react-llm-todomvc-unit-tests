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
            <DestroyButton onDestroy={onDestroyMock} todoId={100} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Delete todo 100");
    });

    test("has the correct class for styling", () => {
        const { getByTestId } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={200} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toHaveClass("destroy");
    });

    test("calls onDestroy with the correct todoId when clicked", () => {
        const { getByTestId } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={300} />
        );
        const button = getByTestId("destroy-button");
        fireEvent.click(button);
        expect(onDestroyMock).toHaveBeenCalledTimes(1);
        expect(onDestroyMock).toHaveBeenCalledWith(300);
    });

    test("renders dynamic aria-label for different todoId values", () => {
        const { getByTestId, rerender } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={1} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toHaveAttribute("aria-label", "Delete todo 1");

        rerender(<DestroyButton onDestroy={onDestroyMock} todoId={999} />);
        expect(button).toHaveAttribute("aria-label", "Delete todo 999");
    });

    test("does not call onDestroy without a click", () => {
        render(<DestroyButton onDestroy={onDestroyMock} todoId={400} />);
        expect(onDestroyMock).not.toHaveBeenCalled();
    });

    test("renders correctly without errors if no onDestroy function is provided", () => {
        const { getByTestId } = render(<DestroyButton todoId={123} />);
        const button = getByTestId("destroy-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Delete todo 123");
        fireEvent.click(button); // Should not throw an error
    });
});