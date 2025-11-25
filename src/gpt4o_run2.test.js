import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ClearCompletedButton } from "./04_ClearCompletedButton";

describe("ClearCompletedButton Component", () => {
    let onClearCompletedMock;

    beforeEach(() => {
        onClearCompletedMock = jest.fn();
    });

    test("renders button with default props", () => {
        const { getByTestId } = render(
            <ClearCompletedButton onClearCompleted={onClearCompletedMock} />
        );
        const button = getByTestId("clear-completed-button");
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent("Clear completed");
        expect(button).not.toBeDisabled();
        expect(button).toHaveClass("clear-completed");
    });

    test("renders disabled button when disabled=true", () => {
        const { getByTestId } = render(
            <ClearCompletedButton onClearCompleted={onClearCompletedMock} disabled={true} />
        );
        const button = getByTestId("clear-completed-button");
        expect(button).toBeDisabled();
    });

    test("renders enabled button when disabled=false", () => {
        const { getByTestId } = render(
            <ClearCompletedButton onClearCompleted={onClearCompletedMock} disabled={false} />
        );
        const button = getByTestId("clear-completed-button");
        expect(button).not.toBeDisabled();
    });

    test("calls onClearCompleted upon click when enabled", () => {
        const { getByTestId } = render(
            <ClearCompletedButton onClearCompleted={onClearCompletedMock} />
        );
        const button = getByTestId("clear-completed-button");
        fireEvent.click(button);
        expect(onClearCompletedMock).toHaveBeenCalledTimes(1);
    });

    test("does not call onClearCompleted when the button is disabled", () => {
        const { getByTestId } = render(
            <ClearCompletedButton onClearCompleted={onClearCompletedMock} disabled={true} />
        );
        const button = getByTestId("clear-completed-button");
        fireEvent.click(button);
        expect(onClearCompletedMock).not.toHaveBeenCalled();
    });

    test("renders with provided class name", () => {
        const { getByTestId } = render(
            <ClearCompletedButton onClearCompleted={onClearCompletedMock} />
        );
        const button = getByTestId("clear-completed-button");
        expect(button).toHaveClass("clear-completed");
    });
});