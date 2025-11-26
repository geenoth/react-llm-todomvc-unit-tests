import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe("FilterLink_Completed Component", () => {
    it("renders correctly with default props", () => {
        render(<FilterLink_Completed />);
        const linkElement = screen.getByTestId("filter-link-completed");
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute("href", "#/completed");
        expect(linkElement).not.toHaveClass("selected");
    });

    it("applies 'selected' class when isActive is true", () => {
        render(<FilterLink_Completed isActive={true} />);
        const linkElement = screen.getByTestId("filter-link-completed");
        expect(linkElement).toHaveClass("selected");
    });

    it("does not apply 'selected' class when isActive is false", () => {
        render(<FilterLink_Completed isActive={false} />);
        const linkElement = screen.getByTestId("filter-link-completed");
        expect(linkElement).not.toHaveClass("selected");
    });

    it("calls onFilterChange with 'completed' when clicked", () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
        const linkElement = screen.getByTestId("filter-link-completed");
        fireEvent.click(linkElement);
        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith("completed");
    });

    it("prevents default action when clicked", () => {
        const mockOnFilterChange = jest.fn();
        render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
        const linkElement = screen.getByTestId("filter-link-completed");
        const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
        fireEvent(linkElement, clickEvent);
        expect(clickEvent.defaultPrevented).toBe(true);
    });
});