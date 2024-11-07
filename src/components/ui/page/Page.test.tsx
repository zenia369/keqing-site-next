import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Page from "./Page";

describe("<Page/>", () => {
  it("should render correctly", () => {
    render(
      <Page>
        <div data-testid="test-component" />
      </Page>
    );

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });
});
