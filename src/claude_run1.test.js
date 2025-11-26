/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { FilterLink_Completed } from "./11_FilterLink_Completed";

// Mock classnames module
jest.mock("classnames", () => {
    return jest.fn((obj) => {
        if (typeof obj === "object") {
            return Object.entries(obj)
                .filter(([, value]) => value)
                .map(([key]) => key)
                .join(" ");
        }
        return "";
    });
});

describe("FilterLink_Completed", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    describe("Rendering", () => {
        test("renders without crashing", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            expect(screen.getByTestId("filter-link-completed")).toBeInTheDocument();
        });

        test("renders as a list item with an anchor", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_Completed onFilterChange={mockOnFilterChange} />
            );
            const li = container.querySelector("li");
            const anchor = container.querySelector("a");
            
            expect(li).toBeInTheDocument();
            expect(anchor).toBeInTheDocument();
            expect(li).toContainElement(anchor);
        });

        test("renders with correct text content", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            expect(screen.getByText("Completed")).toBeInTheDocument();
        });

        test("renders with correct href attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            expect(link).toHaveAttribute("href", "#/completed");
        });

        test("renders with data-testid attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            expect(link).toHaveAttribute("data-testid", "filter-link-completed");
        });
    });

    describe("Props - isActive", () => {
        test("does not have selected class when isActive is false", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-completed");
            expect(link).not.toHaveClass("selected");
        });

        test("has selected class when isActive is true", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_Completed isActive={true} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-completed");
            expect(link).toHaveClass("selected");
        });

        test("defaults isActive to false when not provided", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            expect(link).not.toHaveClass("selected");
        });

        test("updates class when isActive prop changes", () => {
            const mockOnFilterChange = jest.fn();
            const { rerender } = render(
                <FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-completed");
            expect(link).not.toHaveClass("selected");

            rerender(
                <FilterLink_Completed isActive={true} onFilterChange={mockOnFilterChange} />
            );
            expect(link).toHaveClass("selected");
        });
    });

    describe("User Interactions - Click", () => {
        test("calls onFilterChange with 'completed' when clicked", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange).toHaveBeenCalledWith("completed");
        });

        test("prevents default action on click", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            
            const clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");
            
            link.dispatchEvent(clickEvent);
            
            expect(preventDefaultSpy).toHaveBeenCalled();
        });

        test("calls onFilterChange multiple times on multiple clicks", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            
            fireEvent.click(link);
            fireEvent.click(link);
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
        });

        test("calls onFilterChange when isActive is true", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_Completed isActive={true} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-completed");
            
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledWith("completed");
        });

        test("calls onFilterChange when isActive is false", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-completed");
            
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledWith("completed");
        });
    });

    describe("Props - onFilterChange", () => {
        test("accepts and uses onFilterChange callback", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalled();
        });

        test("works with different onFilterChange implementations", () => {
            let capturedFilter = null;
            const customOnFilterChange = (filter) => {
                capturedFilter = filter;
            };
            
            render(<FilterLink_Completed onFilterChange={customOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            
            fireEvent.click(link);
            
            expect(capturedFilter).toBe("completed");
        });
    });

    describe("Accessibility", () => {
        test("anchor is focusable", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-completed");
            
            link.focus();
            
            expect(document.activeElement).toBe(link);
        });

        test("anchor has accessible name", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);
            const link = screen.getByRole("link", { name: "Completed" });
            
            expect(link).toBeInTheDocument();
        });
    });

    describe("Edge Cases", () => {
        test("handles undefined isActive prop gracefully", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_Completed 
                    isActive={undefined} 
                    onFilterChange={mockOnFilterChange} 
                />
            );
            const link = screen.getByTestId("filter-link-completed");
            expect(link).not.toHaveClass("selected");
        });

        test("component structure remains consistent across rerenders", () => {
            const mockOnFilterChange = jest.fn();
            const { container, rerender } = render(
                <FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />
            );
            
            const initialHTML = container.innerHTML;
            
            rerender(
                <FilterLink_Completed isActive={false} onFilterChange={mockOnFilterChange} />
            );
            
            expect(container.innerHTML).toBe(initialHTML);
        });
    });
});