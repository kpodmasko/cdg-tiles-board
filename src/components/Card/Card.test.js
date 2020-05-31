import React from "react";
import { render } from "@testing-library/react";

import Card from ".";
import { testIds } from "@constants";

describe("testing Card component", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<Card />);
    const root = getByTestId(testIds.card);

    expect(root).toBeInTheDocument();
  });

  it("handles prop className", () => {
    const testClassname = "test-classname";
    const { getByTestId } = render(<Card className={testClassname} />);
    const root = getByTestId(testIds.card);

    expect(root.classList.contains(testClassname)).toBe(true);
  });
});
