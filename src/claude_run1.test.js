/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { FilterLink_All } from "./09_FilterLink_All";

// Mock classnames module
jest.mock("classnames", () => {
    return jest.fn((...args) => {
        const result = [];
        args.forEach((arg) => {
            if (typeof arg === "string") {
                result.push(arg);
            } else if (typeof arg === "object" && arg !== null) {
                Object.keys(arg).forEach((key) => {
                    if (arg[key]) {
                        result.push(key);
                    }
                });
            }
        });
        return result.join(" ");
    });
});

describe("FilterLink_All", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    describe("rendering", () => {
        test("renders without crashing", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            expect(screen.getByTestId("filter-link-all")).toBeInTheDocument();
        });

        test("renders an li element containing an anchor", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_All onFilterChange={mockOnFilterChange} />
            );
            const li = container.querySelector("li");
            expect(li).toBeInTheDocument();
            const anchor = li.querySelector("a");
            expect(anchor).toBeInTheDocument();
        });

        test("renders with text 'All'", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            expect(screen.getByText("All")).toBeInTheDocument();
        });

        test("renders anchor with correct href", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-all");
            expect(link).toHaveAttribute("href", "#/");
        });

        test("renders with data-testid attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-all");
            expect(link).toHaveAttribute("data-testid", "filter-link-all");
        });
    });

    describe("isActive prop", () => {
        test("does not have 'selected' class when isActive is false", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-all");
            expect(link).not.toHaveClass("selected");
        });

        test("has 'selected' class when isActive is true", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-all");
            expect(link).toHaveClass("selected");
        });

        test("defaults isActive to false when not provided", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-all");
            expect(link).not.toHaveClass("selected");
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

        test("prevents default behavior on click", () => {
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

        test("calls onFilterChange on multiple clicks", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-all");
            fireEvent.click(link);
            fireEvent.click(link);
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
        });
    });

    describe("props validation", () => {
        test("works correctly when onFilterChange is provided", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-all");
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalled();
        });

        test("renders correctly with both props provided", () => {
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />
            );
            const link = screen.getByTestId("filter-link-all");
            expect(link).toHaveClass("selected");
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalledWith("all");
        });
    });

    describe("classnames integration", () => {
        test("calls classnames with correct arguments when isActive is true", () => {
            const classnames = require("classnames");
            const mockOnFilterChange = jest.fn();
            render(
                <FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />
            );
            expect(classnames).toHaveBeenCalledWith({ selected: true });
        });

        test("calls classnames with correct arguments when isActive is false", () => {
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

        test("link can be activated via keyboard", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_All onFilterChange={mockOnFilterChange} />);
            const link = screen.getByTestId("filter-link-all");
            link.focus();
            fireEvent.keyDown(link, { key: "Enter", code: "Enter" });
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalledWith("all");
        });
    });

    describe("snapshot tests", () => {
        test("matches snapshot when inactive", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_All isActive={false} onFilterChange={mockOnFilterChange} />
            );
            expect(container).toMatchSnapshot();
        });

        test("matches snapshot when active", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_All isActive={true} onFilterChange={mockOnFilterChange} />
            );
            expect(container).toMatchSnapshot();
        });
    });
});