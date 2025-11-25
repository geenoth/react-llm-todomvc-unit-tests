/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { FilterLink_Active } from "./10_FilterLink_Active";

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

describe("FilterLink_Active", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    describe("Rendering", () => {
        test("renders without crashing", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            expect(screen.getByTestId("filter-link-active")).toBeInTheDocument();
        });

        test("renders as a list item with an anchor tag", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link.tagName).toBe("A");
            expect(link.parentElement.tagName).toBe("LI");
        });

        test("renders with correct text content 'Active'", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            expect(screen.getByText("Active")).toBeInTheDocument();
        });

        test("renders with correct href attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).toHaveAttribute("href", "#/active");
        });

        test("renders with data-testid attribute", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).toHaveAttribute("data-testid", "filter-link-active");
        });
    });

    describe("Props - isActive", () => {
        test("does not have 'selected' class when isActive is false", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).not.toHaveClass("selected");
        });

        test("has 'selected' class when isActive is true", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active isActive={true} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).toHaveClass("selected");
        });

        test("defaults isActive to false when not provided", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).not.toHaveClass("selected");
        });

        test("handles isActive prop change from false to true", () => {
            const mockOnFilterChange = jest.fn();
            const { rerender } = render(
                <FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />
            );
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).not.toHaveClass("selected");
            
            rerender(<FilterLink_Active isActive={true} onFilterChange={mockOnFilterChange} />);
            expect(link).toHaveClass("selected");
        });

        test("handles isActive prop change from true to false", () => {
            const mockOnFilterChange = jest.fn();
            const { rerender } = render(
                <FilterLink_Active isActive={true} onFilterChange={mockOnFilterChange} />
            );
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).toHaveClass("selected");
            
            rerender(<FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />);
            expect(link).not.toHaveClass("selected");
        });
    });

    describe("User Interactions - Click", () => {
        test("calls onFilterChange with 'active' when clicked", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange).toHaveBeenCalledWith("active");
        });

        test("prevents default behavior when clicked", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
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
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            
            fireEvent.click(link);
            fireEvent.click(link);
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(1, "active");
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(2, "active");
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(3, "active");
        });

        test("calls onFilterChange regardless of isActive state", () => {
            const mockOnFilterChange = jest.fn();
            
            const { rerender } = render(
                <FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />
            );
            
            const link = screen.getByTestId("filter-link-active");
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            
            rerender(<FilterLink_Active isActive={true} onFilterChange={mockOnFilterChange} />);
            fireEvent.click(link);
            expect(mockOnFilterChange).toHaveBeenCalledTimes(2);
        });
    });

    describe("Props - onFilterChange", () => {
        test("accepts onFilterChange as a function prop", () => {
            const mockOnFilterChange = jest.fn();
            expect(() => {
                render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            }).not.toThrow();
        });

        test("onFilterChange receives correct argument type", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            fireEvent.click(link);
            
            expect(typeof mockOnFilterChange.mock.calls[0][0]).toBe("string");
        });
    });

    describe("Accessibility", () => {
        test("link is focusable", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            link.focus();
            
            expect(document.activeElement).toBe(link);
        });

        test("link can be activated with keyboard enter key", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            link.focus();
            fireEvent.keyDown(link, { key: "Enter", code: "Enter" });
            fireEvent.click(link);
            
            expect(mockOnFilterChange).toHaveBeenCalled();
        });
    });

    describe("Component Structure", () => {
        test("renders correct DOM structure", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_Active onFilterChange={mockOnFilterChange} />
            );
            
            const li = container.querySelector("li");
            expect(li).toBeInTheDocument();
            
            const anchor = li.querySelector("a");
            expect(anchor).toBeInTheDocument();
            expect(anchor.textContent).toBe("Active");
        });

        test("only renders one list item", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_Active onFilterChange={mockOnFilterChange} />
            );
            
            const listItems = container.querySelectorAll("li");
            expect(listItems).toHaveLength(1);
        });

        test("only renders one anchor tag", () => {
            const mockOnFilterChange = jest.fn();
            const { container } = render(
                <FilterLink_Active onFilterChange={mockOnFilterChange} />
            );
            
            const anchors = container.querySelectorAll("a");
            expect(anchors).toHaveLength(1);
        });
    });

    describe("Edge Cases", () => {
        test("handles undefined onFilterChange gracefully on render", () => {
            expect(() => {
                render(<FilterLink_Active />);
            }).not.toThrow();
        });

        test("handles null isActive prop", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active isActive={null} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).not.toHaveClass("selected");
        });

        test("handles undefined isActive prop", () => {
            const mockOnFilterChange = jest.fn();
            render(<FilterLink_Active isActive={undefined} onFilterChange={mockOnFilterChange} />);
            
            const link = screen.getByTestId("filter-link-active");
            expect(link).not.toHaveClass("selected");
        });
    });

    describe("classnames Integration", () => {
        test("classnames is called with correct argument when isActive is true", () => {
            const classnames = require("classnames");
            const mockOnFilterChange = jest.fn();
            
            render(<FilterLink_Active isActive={true} onFilterChange={mockOnFilterChange} />);
            
            expect(classnames).toHaveBeenCalledWith({ selected: true });
        });

        test("classnames is called with correct argument when isActive is false", () => {
            const classnames = require("classnames");
            const mockOnFilterChange = jest.fn();
            
            render(<FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />);
            
            expect(classnames).toHaveBeenCalledWith({ selected: false });
        });
    });
});