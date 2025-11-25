import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToggleAllCheckbox } from "./07_ToggleAllCheckbox";

describe("07_ToggleAllCheckbox Component", () => {
    const mockOnToggleAll = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with default props", () => {
        render(<ToggleAllCheckbox />);
        const checkbox = screen.getByTestId("toggle-all-checkbox");

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });

    test("renders correctly with allCompleted=true and disabled=false", () => {
        render(
            <ToggleAllCheckbox allCompleted={true} disabled={false} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeEnabled();
        expect(checkbox).toBeChecked();
    });

    test("renders correctly with allCompleted=false and disabled=true", () => {
        render(
            <ToggleAllCheckbox allCompleted={false} disabled={true} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");

        expect(checkbox).toBeInTheDocument();
        expect(checkbox).toBeDisabled();
        expect(checkbox).not.toBeChecked();
    });

    test("triggers onToggleAll(true) when checkbox is checked", () => {
        render(
            <ToggleAllCheckbox allCompleted={false} disabled={false} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");

        fireEvent.click(checkbox);

        expect(mockOnToggleAll).toHaveBeenCalledWith(true);
        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    });

    test("triggers onToggleAll(false) when checkbox is unchecked", () => {
        render(
            <ToggleAllCheckbox allCompleted={true} disabled={false} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");

        fireEvent.click(checkbox);

        expect(mockOnToggleAll).toHaveBeenCalledWith(false);
        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    });

    test("does not trigger onToggleAll when checkbox is disabled", () => {
        render(
            <ToggleAllCheckbox allCompleted={true} disabled={true} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");

        fireEvent.click(checkbox);

        expect(mockOnToggleAll).not.toHaveBeenCalled();
    });

    test("renders the label correctly and associates it with the checkbox", () => {
        render(<ToggleAllCheckbox />);
        const label = screen.getByText("Toggle All Input");

        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute("for", "toggle-all-checkbox");
    });

    test("checkbox has correct aria-label for accessibility", () => {
        render(<ToggleAllCheckbox />);
        const checkbox = screen.getByTestId("toggle-all-checkbox");

        expect(checkbox).toHaveAttribute("aria-label", "Toggle all todos");
    });
});