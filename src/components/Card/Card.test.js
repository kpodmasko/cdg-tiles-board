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

  it("handles prop onClick", () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<Card onClick={onClick} />);
    const root = getByTestId(testIds.card);

    root.click();

    expect(onClick.mock.calls.length).toBe(1);
  });

  it("renders content", () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <Card onClick={onClick}>
        <div>TEST_CHILD</div>
      </Card>
    );

    expect(getByText("TEST_CHILD")).toBeTruthy();
  });
});
