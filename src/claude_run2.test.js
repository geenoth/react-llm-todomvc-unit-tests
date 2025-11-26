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
        it("should render correctly with default props", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            expect(link).toBeTruthy();
            expect(link.textContent).toBe("Completed");
            expect(link.getAttribute("href")).toBe("#/completed");
        });

        it("should render within an li element", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_Completed onFilterChange={mockOnFilterChange} />
            );

            const li = container.querySelector("li");
            expect(li).toBeTruthy();
            expect(li.querySelector("a")).toBeTruthy();
        });

        it("should render with correct href attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            expect(link.getAttribute("href")).toBe("#/completed");
        });

        it("should render with data-testid attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            expect(link).toBeTruthy();
        });
    });

    describe("isActive prop", () => {
        it("should not have selected class when isActive is false", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_Completed
                    isActive={false}
                    onFilterChange={mockOnFilterChange}
                />
            );

            const link = screen.getByTestId("filter-link-completed");
            expect(link.className).not.toContain("selected");
        });

        it("should have selected class when isActive is true", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_Completed
                    isActive={true}
                    onFilterChange={mockOnFilterChange}
                />
            );

            const link = screen.getByTestId("filter-link-completed");
            expect(link.className).toContain("selected");
        });

        it("should default isActive to false when not provided", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            expect(link.className).not.toContain("selected");
        });
    });

    describe("Click interactions", () => {
        it("should call onFilterChange with 'completed' when clicked", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            fireEvent.click(link);

            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange).toHaveBeenCalledWith("completed");
        });

        it("should prevent default behavior when clicked", () => {
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

        it("should call onFilterChange multiple times on multiple clicks", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            
            fireEvent.click(link);
            fireEvent.click(link);
            fireEvent.click(link);

            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
        });
    });

    describe("Props validation", () => {
        it("should work with undefined onFilterChange initially", () => {
            // This tests the component's resilience
            expect(() => {
                render(<FilterLink_Completed />);
            }).not.toThrow();
        });

        it("should handle onFilterChange being called with correct argument type", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            fireEvent.click(link);

            const callArg = mockOnFilterChange.mock.calls[0][0];
            expect(typeof callArg).toBe("string");
            expect(callArg).toBe("completed");
        });
    });

    describe("Classnames integration", () => {
        it("should use classnames for conditional class application", () => {
            const classnames = require("classnames");
            const mockOnFilterChange = jest.fn();
            
            render(
                <FilterLink_Completed
                    isActive={true}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(classnames).toHaveBeenCalledWith({ selected: true });
        });

        it("should call classnames with selected: false when not active", () => {
            const classnames = require("classnames");
            const mockOnFilterChange = jest.fn();
            
            render(
                <FilterLink_Completed
                    isActive={false}
                    onFilterChange={mockOnFilterChange}
                />
            );

            expect(classnames).toHaveBeenCalledWith({ selected: false });
        });
    });

    describe("Accessibility", () => {
        it("should be a valid anchor element", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-completed");
            expect(link.tagName.toLowerCase()).toBe("a");
        });

        it("should have accessible text content", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Completed onFilterChange={mockOnFilterChange} />);

            const link = screen.getByText("Completed");
            expect(link).toBeTruthy();
        });
    });

    describe("Component structure", () => {
        it("should have correct DOM structure", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_Completed onFilterChange={mockOnFilterChange} />
            );

            const li = container.firstChild;
            expect(li.tagName.toLowerCase()).toBe("li");

            const anchor = li.firstChild;
            expect(anchor.tagName.toLowerCase()).toBe("a");
        });
    });
});