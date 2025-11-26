import React from "react";
import { render, screen } from "@testing-library/react";
import { RemainingCounter } from './12_RemainingCounter';

describe("RemainingCounter Component", () => {
    it("renders correctly with default props", () => {
        render(<RemainingCounter />);
        const counterElement = screen.getByTestId("remaining-counter");
        expect(counterElement).toBeInTheDocument();
        expect(counterElement).toHaveTextContent("0 items left!");
        expect(counterElement).toHaveClass("todo-count");
    });

    it("renders correctly for item count of 1", () => {
        render(<RemainingCounter count={1} />);
        const counterElement = screen.getByTestId("remaining-counter");
        expect(counterElement).toHaveTextContent("1 item left!");
    });

    it("renders correctly for item count greater than 1", () => {
        render(<RemainingCounter count={5} />);
        const counterElement = screen.getByTestId("remaining-counter");
        expect(counterElement).toHaveTextContent("5 items left!");
    });

    it("renders correctly for item count of 0", () => {
        render(<RemainingCounter count={0} />);
        const counterElement = screen.getByTestId("remaining-counter");
        expect(counterElement).toHaveTextContent("0 items left!");
    });

    it("updates rendering when count prop changes", () => {
        const { rerender } = render(<RemainingCounter count={2} />);
        const counterElement = screen.getByTestId("remaining-counter");
        expect(counterElement).toHaveTextContent("2 items left!");

        rerender(<RemainingCounter count={1} />);
        expect(counterElement).toHaveTextContent("1 item left!");

        rerender(<RemainingCounter count={0} />);
        expect(counterElement).toHaveTextContent("0 items left!");
    });
});