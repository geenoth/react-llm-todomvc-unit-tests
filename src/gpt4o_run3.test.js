import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { FilterLink_Active } from "./10_FilterLink_Active";

describe("FilterLink_Active Component", () => {
  it("renders correctly with default props", () => {
    const { getByTestId } = render(<FilterLink_Active />);
    const linkElement = getByTestId("filter-link-active");
    
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveTextContent("Active");
    expect(linkElement).not.toHaveClass("selected");
  });

  it("renders correctly when isActive is true", () => {
    const { getByTestId } = render(<FilterLink_Active isActive={true} />);
    const linkElement = getByTestId("filter-link-active");
    
    expect(linkElement).toHaveClass("selected");
  });

  it("executes the onFilterChange callback when clicked", () => {
    const mockOnFilterChange = jest.fn();
    const { getByTestId } = render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);

    const linkElement = getByTestId("filter-link-active");
    fireEvent.click(linkElement);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith("active");
  });

  it("prevents default behavior of the click event", () => {
    const preventDefault = jest.fn();
    const mockOnFilterChange = jest.fn();
    const { getByTestId } = render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);

    const linkElement = getByTestId("filter-link-active");
    fireEvent.click(linkElement, { preventDefault });

    expect(preventDefault).toHaveBeenCalledTimes(1);
  });
});