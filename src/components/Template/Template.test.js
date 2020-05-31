import React from "react";
import { render } from "@testing-library/react";

import Template from ".";
import { testIds } from "@constants";

describe("testing Template component", () => {
  it("renders without error", () => {
    const { getByTestId } = render(<Template />);
    const root = getByTestId(testIds.template);

    expect(root).toBeInTheDocument();
  });
});
