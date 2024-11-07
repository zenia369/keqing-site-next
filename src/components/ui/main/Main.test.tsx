import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Main from "./Main";

describe("<Main/>", () => {
  it("should render correctly", () => {
    render(
      <Main>
        <div data-testid="test-component" />
      </Main>
    );

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });
});
