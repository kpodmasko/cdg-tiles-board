import React from "react";
import { render } from "@testing-library/react";

import Board from ".";
import { testIds } from "@constants";

describe("testing Board component", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<Board />);
    const root = getByTestId(testIds.board);

    expect(root).toBeInTheDocument();
  });

  it("handles prop className", () => {
    const testClassname = "test-classname";
    const { getByTestId } = render(<Board className={testClassname} />);
    const root = getByTestId(testIds.board);

    expect(root.classList.contains(testClassname)).toBe(true);
  });
});
