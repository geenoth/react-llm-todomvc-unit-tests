import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterLink_Active } from "./10_FilterLink_Active";

describe("10_FilterLink_Active Component", () => {
    const mockOnFilterChange = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test("renders correctly with default props", () => {
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const link = screen.getByTestId("filter-link-active");

        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("Active");
        expect(link).not.toHaveClass("selected");
        expect(link).toHaveAttribute("href", "#/active");
    });

    test("renders with isActive=true and applies the selected class", () => {
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} isActive={true} />);
        const link = screen.getByTestId("filter-link-active");

        expect(link).toHaveClass("selected");
    });

    test("renders with isActive=false and does not apply the selected class", () => {
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} isActive={false} />);
        const link = screen.getByTestId("filter-link-active");

        expect(link).not.toHaveClass("selected");
    });

    test("calls onFilterChange with 'active' when clicked", () => {
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const link = screen.getByTestId("filter-link-active");

        fireEvent.click(link);

        expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
        expect(mockOnFilterChange).toHaveBeenCalledWith("active");
    });

    test("prevents default anchor behavior on click", () => {
        render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
        const link = screen.getByTestId("filter-link-active");

        const preventDefault = jest.fn();
        fireEvent.click(link, { preventDefault });

        expect(preventDefault).toHaveBeenCalledTimes(1);
    });
});