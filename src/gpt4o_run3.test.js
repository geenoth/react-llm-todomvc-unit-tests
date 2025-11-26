import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterLink_Completed } from "./11_FilterLink_Completed";

describe("FilterLink_Completed Component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<FilterLink_Completed />);
    const linkElement = getByTestId("filter-link-completed");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Completed");
    expect(linkElement).not.toHaveClass("selected");
  });

  it("renders correctly when isActive is true", () => {
    const { getByTestId } = render(<FilterLink_Completed isActive={true} />);
    const linkElement = getByTestId("filter-link-completed");

    expect(linkElement).toHaveClass("selected");
  });

  it("executes the onFilterChange callback when clicked", () => {
    const mockOnFilterChange = jest.fn();
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

    const linkElement = getByTestId("filter-link-completed");
    fireEvent.click(linkElement);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("completed");
  });

  it("prevents default behavior of the click event", () => {
    const preventDefault = jest.fn();
    const mockOnFilterChange = jest.fn();
    const { getByTestId } = render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

    const linkElement = getByTestId("filter-link-completed");
    fireEvent.click(linkElement, { preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});