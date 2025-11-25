import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DestroyButton } from "./03_DestroyButton";

describe("DestroyButton Component", () => {
    let onDestroyMock;

    beforeEach(() => {
        onDestroyMock = jest.fn();
    });

    test("renders correctly with given todoId", () => {
        const { getByTestId } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={1} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveAttribute("aria-label", "Delete todo 1");
    });

    test("calls onDestroy with correct todoId when clicked", () => {
        const { getByTestId } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={42} />
        );
        const button = getByTestId("destroy-button");
        fireEvent.click(button);
        expect(onDestroyMock).toHaveBeenCalledTimes(1);
        expect(onDestroyMock).toHaveBeenCalledWith(42);
    });

    test("does not call onDestroy without a click", () => {
        render(<DestroyButton onDestroy={onDestroyMock} todoId={10} />);
        expect(onDestroyMock).not.toHaveBeenCalled();
    });

    test("renders with dynamic aria-label for different todoId values", () => {
        const { getByTestId, rerender } = render(
            <DestroyButton onDestroy={onDestroyMock} todoId={5} />
        );
        const button = getByTestId("destroy-button");
        expect(button).toHaveAttribute("aria-label", "Delete todo 5");

        rerender(<DestroyButton onDestroy={onDestroyMock} todoId={99} />);
        expect(button).toHaveAttribute("aria-label", "Delete todo 99");
    });
});