import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ToggleAllCheckbox } from "./07_ToggleAllCheckbox";

describe("07_ToggleAllCheckbox Component", () => {
    const mockOnToggleAll = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders the checkbox component correctly with default props", () => {
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
        expect(checkbox).toBeChecked();
        expect(checkbox).toBeEnabled();
    });

    test("fires onToggleAll with true when checkbox is checked", () => {
        render(
            <ToggleAllCheckbox allCompleted={false} disabled={false} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");
        fireEvent.click(checkbox);
        expect(mockOnToggleAll).toHaveBeenCalledWith(true);
        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    });

    test("fires onToggleAll with false when checkbox is unchecked", () => {
        render(
            <ToggleAllCheckbox allCompleted={true} disabled={false} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");
        fireEvent.click(checkbox);
        expect(mockOnToggleAll).toHaveBeenCalledWith(false);
        expect(mockOnToggleAll).toHaveBeenCalledTimes(1);
    });

    test("does not fire onToggleAll when the checkbox is disabled", () => {
        render(
            <ToggleAllCheckbox allCompleted={false} disabled={true} onToggleAll={mockOnToggleAll} />
        );
        const checkbox = screen.getByTestId("toggle-all-checkbox");
        fireEvent.click(checkbox);
        expect(mockOnToggleAll).not.toHaveBeenCalled();
    });

    test("renders the correct label associated with the checkbox", () => {
        render(<ToggleAllCheckbox />);
        const label = screen.getByText("Toggle All Input");
        expect(label).toBeInTheDocument();
        expect(label).toHaveAttribute("for", "toggle-all-checkbox");
    });
});