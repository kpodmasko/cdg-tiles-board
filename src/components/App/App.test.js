import React from "react";
import { render } from "@testing-library/react";

import App from ".";
import { testIds } from "@constants";

describe("testing App component", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<App />);
    const root = getByTestId(testIds.app);

    expect(root).toBeInTheDocument();
  });
});
