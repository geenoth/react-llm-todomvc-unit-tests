/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { FilterLink_All } from "./09_FilterLink_All";

// Mock classnames module
jest.mock("classnames", () => {
    return jest.fn((...args) => {
        const classes = [];
        args.forEach((arg) => {
            if (typeof arg === "string") {
                classes.push(arg);
            } else if (typeof arg === "object" && arg !== null) {
                Object.keys(arg).forEach((key) => {
                    if (arg[key]) {
                        classes.push(key);
                    }
                });
            }
        });
        return classes.join(" ");
    });
});

describe("FilterLink_All", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    describe("rendering", () => {
        test("renders correctly with default props", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-all");
            expect(link).toBeTruthy();
            expect(link.textContent).toBe("All");
            expect(link.tagName).toBe("A");
            expect(link.getAttribute("href")).toBe("#/");
        });

        test("renders inside an li element", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_All onFilterChange={mockOnFilterChange} />
            );

            const li = container.querySelector("li");
            expect(li).toBeTruthy();
            expect(li.querySelector("a")).toBeTruthy();
        });

        test("renders with isActive=false by default", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-all");
            expect(link.className).not.toContain("selected");
        });

        test("renders with selected class when isActive is true", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />
            );

            const link = screen.getByTestId("filter-link-all");
            expect(link.className).toContain("selected");
        });

        test("renders without selected class when isActive is false", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );

            const link = screen.getByTestId("filter-link-all");
            expect(link.className).not.toContain("selected");
        });

        test("has correct data-testid attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-all");
            expect(link.getAttribute("data-testid")).toBe("filter-link-all");
        });
    });

    describe("user interactions", () => {
        test("calls onFilterChange with 'all' when clicked", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-all");
            fireEvent.click(link);

            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange).toHaveBeenCalledWith("all");
        });

        test("prevents default action on click", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-all");
            const clickEvent = new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
            });
            const preventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");

            link.dispatchEvent(clickEvent);

            expect(preventDefaultSpy).toHaveBeenCalled();
        });

        test("handles multiple clicks correctly", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-all");
            fireEvent.click(link);
            fireEvent.click(link);
            fireEvent.click(link);

            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(1, "all");
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(2, "all");
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(3, "all");
        });
    });

    describe("props handling", () => {
        test("works with undefined onFilterChange (edge case)", () => {
            // This should throw an error since onFilterChange is called
            const { container } = render(<FilterLink_All />);
            const link = screen.getByTestId("filter-link-all");
            
            expect(() => {
                fireEvent.click(link);
            }).toThrow();
        });

        test("toggles selected class based on isActive prop changes", () => {
            const mockOnFilterChange = jest.fn();
            const { rerender } = render(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );

            let link = screen.getByTestId("filter-link-all");
            expect(link.className).not.toContain("selected");

            rerender(
                <FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />
            );

            link = screen.getByTestId("filter-link-all");
            expect(link.className).toContain("selected");

            rerender(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );

            link = screen.getByTestId("filter-link-all");
            expect(link.className).not.toContain("selected");
        });

        test("accepts different onFilterChange functions", () => {
            const mockOnFilterChange1 = jest.fn();
            const mockOnFilterChange2 = jest.fn();

            const { rerender } = render(
                <FilterLink_All onFilterChange={mockOnFilterChange1} />
            );

            const link = screen.getByTestId("filter-link-all");
            fireEvent.click(link);
            expect(mockOnFilterChange1).toHaveBeenCalledTimes(1);

            rerender(<FilterLink_All onFilterChange={mockOnFilterChange2} />);

            fireEvent.click(link);
            expect(mockOnFilterChange1).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange2).toHaveBeenCalledTimes(1);
        });
    });

    describe("classnames integration", () => {
        test("uses classnames correctly for active state", () => {
            const classnames = require("classnames");
            const mockOnFilterChange = jest.fn();

            render(
                <FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />
            );

            expect(classnames).toHaveBeenCalledWith({ selected: true });
        });

        test("uses classnames correctly for inactive state", () => {
            const classnames = require("classnames");
            const mockOnFilterChange = jest.fn();

            render(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );

            expect(classnames).toHaveBeenCalledWith({ selected: false });
        });
    });

    describe("accessibility", () => {
        test("link is focusable", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByTestId("filter-link-all");
            link.focus();

            expect(document.activeElement).toBe(link);
        });

        test("link has accessible text content", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);

            const link = screen.getByText("All");
            expect(link).toBeTruthy();
        });
    });

    describe("DOM structure", () => {
        test("has correct DOM hierarchy", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_All onFilterChange={mockOnFilterChange} />
            );

            const li = container.firstChild;
            expect(li.tagName).toBe("LI");

            const a = li.firstChild;
            expect(a.tagName).toBe("A");
            expect(a.textContent).toBe("All");
        });
    });
});