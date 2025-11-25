/**
 * @jest-environment jsdom
 */

import React from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { FilterLink_Active } from "./10_FilterLink_Active";

describe("FilterLink_Active", () => {
    let container;
    let root;

    beforeEach(() => {
        container = document.createElement("div");
        document.body.appendChild(container);
        root = createRoot(container);
    });

    afterEach(() => {
        act(() => {
            root.unmount();
        });
        container.remove();
        container = null;
        root = null;
    });

    const renderComponent = (props = {}) => {
        act(() => {
            root.render(<FilterLink_Active {...props} />);
        });
    };

    describe("rendering", () => {
        test("renders an li element", () => {
            renderComponent({ onFilterChange: jest.fn() });
            const li = container.querySelector("li");
            expect(li).not.toBeNull();
        });

        test("renders an anchor element inside li", () => {
            renderComponent({ onFilterChange: jest.fn() });
            const anchor = container.querySelector("li > a");
            expect(anchor).not.toBeNull();
        });

        test("renders with correct href attribute", () => {
            renderComponent({ onFilterChange: jest.fn() });
            const anchor = container.querySelector("a");
            expect(anchor.getAttribute("href")).toBe("#/active");
        });

        test("renders with correct data-testid attribute", () => {
            renderComponent({ onFilterChange: jest.fn() });
            const anchor = container.querySelector('[data-testid="filter-link-active"]');
            expect(anchor).not.toBeNull();
        });

        test("renders with text 'Active'", () => {
            renderComponent({ onFilterChange: jest.fn() });
            const anchor = container.querySelector("a");
            expect(anchor.textContent).toBe("Active");
        });
    });

    describe("isActive prop", () => {
        test("does not have 'selected' class when isActive is false", () => {
            renderComponent({ isActive: false, onFilterChange: jest.fn() });
            const anchor = container.querySelector("a");
            expect(anchor.classList.contains("selected")).toBe(false);
        });

        test("does not have 'selected' class when isActive is not provided (default)", () => {
            renderComponent({ onFilterChange: jest.fn() });
            const anchor = container.querySelector("a");
            expect(anchor.classList.contains("selected")).toBe(false);
        });

        test("has 'selected' class when isActive is true", () => {
            renderComponent({ isActive: true, onFilterChange: jest.fn() });
            const anchor = container.querySelector("a");
            expect(anchor.classList.contains("selected")).toBe(true);
        });

        test("toggles 'selected' class when isActive changes from false to true", () => {
            const mockOnFilterChange = jest.fn();
            renderComponent({ isActive: false, onFilterChange: mockOnFilterChange });
            let anchor = container.querySelector("a");
            expect(anchor.classList.contains("selected")).toBe(false);

            act(() => {
                root.render(<FilterLink_Active isActive={true} onFilterChange={mockOnFilterChange} />);
            });
            anchor = container.querySelector("a");
            expect(anchor.classList.contains("selected")).toBe(true);
        });

        test("toggles 'selected' class when isActive changes from true to false", () => {
            const mockOnFilterChange = jest.fn();
            renderComponent({ isActive: true, onFilterChange: mockOnFilterChange });
            let anchor = container.querySelector("a");
            expect(anchor.classList.contains("selected")).toBe(true);

            act(() => {
                root.render(<FilterLink_Active isActive={false} onFilterChange={mockOnFilterChange} />);
            });
            anchor = container.querySelector("a");
            expect(anchor.classList.contains("selected")).toBe(false);
        });
    });

    describe("click interaction", () => {
        test("calls onFilterChange with 'active' when clicked", () => {
            const mockOnFilterChange = jest.fn();
            renderComponent({ onFilterChange: mockOnFilterChange });

            const anchor = container.querySelector('[data-testid="filter-link-active"]');
            act(() => {
                anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
            expect(mockOnFilterChange).toHaveBeenCalledWith("active");
        });

        test("prevents default behavior on click", () => {
            const mockOnFilterChange = jest.fn();
            renderComponent({ onFilterChange: mockOnFilterChange });

            const anchor = container.querySelector('[data-testid="filter-link-active"]');
            const clickEvent = new MouseEvent("click", { bubbles: true, cancelable: true });
            const preventDefaultSpy = jest.spyOn(clickEvent, "preventDefault");

            act(() => {
                anchor.dispatchEvent(clickEvent);
            });

            expect(preventDefaultSpy).toHaveBeenCalled();
        });

        test("handles multiple clicks correctly", () => {
            const mockOnFilterChange = jest.fn();
            renderComponent({ onFilterChange: mockOnFilterChange });

            const anchor = container.querySelector('[data-testid="filter-link-active"]');
            
            act(() => {
                anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            act(() => {
                anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            act(() => {
                anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(mockOnFilterChange).toHaveBeenCalledTimes(3);
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(1, "active");
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(2, "active");
            expect(mockOnFilterChange).toHaveBeenNthCalledWith(3, "active");
        });
    });

    describe("props combinations", () => {
        test("renders correctly with both isActive true and onFilterChange", () => {
            const mockOnFilterChange = jest.fn();
            renderComponent({ isActive: true, onFilterChange: mockOnFilterChange });

            const anchor = container.querySelector('[data-testid="filter-link-active"]');
            expect(anchor.classList.contains("selected")).toBe(true);

            act(() => {
                anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(mockOnFilterChange).toHaveBeenCalledWith("active");
        });

        test("renders correctly with isActive false and onFilterChange", () => {
            const mockOnFilterChange = jest.fn();
            renderComponent({ isActive: false, onFilterChange: mockOnFilterChange });

            const anchor = container.querySelector('[data-testid="filter-link-active"]');
            expect(anchor.classList.contains("selected")).toBe(false);

            act(() => {
                anchor.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });

            expect(mockOnFilterChange).toHaveBeenCalledWith("active");
        });
    });

    describe("accessibility", () => {
        test("anchor element is focusable", () => {
            renderComponent({ onFilterChange: jest.fn() });
            const anchor = container.querySelector("a");
            expect(anchor.tagName).toBe("A");
            expect(anchor.getAttribute("href")).toBeTruthy();
        });
    });

    describe("structure", () => {
        test("maintains correct DOM structure", () => {
            renderComponent({ isActive: true, onFilterChange: jest.fn() });
            
            const li = container.querySelector("li");
            expect(li).not.toBeNull();
            expect(li.children.length).toBe(1);
            
            const anchor = li.children[0];
            expect(anchor.tagName).toBe("A");
            expect(anchor.textContent).toBe("Active");
        });
    });
});