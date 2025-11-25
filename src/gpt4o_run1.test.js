import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterLink_Active } from "./10_FilterLink_Active";

describe("FilterLink_Active Component", () => {
    test("renders correctly with default props", () => {
        const { getByTestId } = render(<FilterLink_Active />);
        const linkElement = getByTestId("filter-link-active");

        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveTextContent("Active");
        expect(linkElement).toHaveAttribute("href", "#/active");
        expect(linkElement).not.toHaveClass("selected");
    });

    test("applies 'selected' class when isActive is true", () => {
        const { getByTestId } = render(<FilterLink_Active isActive={true} />);
        const linkElement = getByTestId("filter-link-active");

        expect(linkElement).toHaveClass("selected");
    });

    test("does not apply 'selected' class when isActive is false", () => {
        const { getByTestId } = render(<FilterLink_Active isActive={false} />);
        const linkElement = getByTestId("filter-link-active");

        expect(linkElement).not.toHaveClass("selected");
    });

    test("calls onFilterChange with 'active' when clicked", () => {
        const mockOnFilterChange = jest.fn();
        const { getByTestId } = render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const linkElement = getByTestId("filter-link-active");

        fireEvent.click(linkElement);

        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith("active");
    });

    test("prevents default behavior on click", () => {
        const mockOnFilterChange = jest.fn();
        const { getByTestId } = render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const linkElement = getByTestId("filter-link-active");

        const clickEvent = new MouseEvent("click", {
            bubbles: true,
            cancelable: true,
        });

        linkElement.dispatchEvent(clickEvent);

        expect(clickEvent.defaultPrevented).toBe(true);
    });
});