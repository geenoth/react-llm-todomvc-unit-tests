import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RemainingCounter } from "./12_RemainingCounter";

describe("RemainingCounter Component", () => {
  test("renders correctly with default props", () => {
    render(<RemainingCounter />);
    const counterElement = screen.getByTestId("remaining-counter");
    expect(counterElement).toHaveTextContent("0 items left!");
    expect(counterElement).toHaveClass("todo-count");
  });

  test("renders correctly with count set to 1", () => {
    render(<RemainingCounter count={1} />);
    const counterElement = screen.getByTestId("remaining-counter");
    expect(counterElement).toHaveTextContent("1 item left!");
  });

  test("renders correctly with count greater than 1", () => {
    render(<RemainingCounter count={5} />);
    const counterElement = screen.getByTestId("remaining-counter");
    expect(counterElement).toHaveTextContent("5 items left!");
  });

  test("renders correctly with count set to 0", () => {
    render(<RemainingCounter count={0} />);
    const counterElement = screen.getByTestId("remaining-counter");
    expect(counterElement).toHaveTextContent("0 items left!");
  });

  test("renders correctly when passing unexpected types", () => {
    render(<RemainingCounter count={"unexpected"} />);
    const counterElement = screen.getByTestId("remaining-counter");
    expect(counterElement).toHaveTextContent("unexpected items left!");
  });
});