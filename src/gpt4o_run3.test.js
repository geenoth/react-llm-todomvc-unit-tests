import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterLink_All } from "./09_FilterLink_All";

describe("FilterLink_All Component", () => {
    test("renders correctly with default props", () => {
        const { getByTestId } = render(<FilterLink_All />);
        const linkElement = getByTestId("filter-link-all");

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("All");
        expect(linkElement).toHaveAttribute("href", "#/");
        expect(linkElement).not.toHaveClass("selected");
    });

    test("applies 'selected' class when isActive is true", () => {
        const { getByTestId } = render(<FilterLink_All isActive={true} />);
        const linkElement = getByTestId("filter-link-all");

        expect(linkElement).toHaveClass("selected");
    });

    test("does not apply 'selected' class when isActive is false", () => {
        const { getByTestId } = render(<FilterLink_All isActive={false} />);
        const linkElement = getByTestId("filter-link-all");

        expect(linkElement).not.toHaveClass("selected");
    });

    test("calls onFilterChange with 'all' when clicked", () => {
        const mockOnFilterChange = jest.fn();
        const { getByTestId } = render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
        const linkElement = getByTestId("filter-link-all");

        fireEvent.click(linkElement);

        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith("all");
    });

    test("prevents default behavior on click", () => {
        const mockOnFilterChange = jest.fn();
        const { getByTestId } = render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
        const linkElement = getByTestId("filter-link-all");

        const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        });

        linkElement.dispatchEvent(clickEvent);

        expect(clickEvent.defaultPrevented).toBe(true);
    });
});