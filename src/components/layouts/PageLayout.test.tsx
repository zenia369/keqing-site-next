import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import PageLayout from "./PageLayout";

describe("<PageLayout/>", () => {
  it("should render correctly", () => {
    render(
      <PageLayout>
        <div data-testid="test-component" />
      </PageLayout>
    );

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home page" })).toBeInTheDocument();
  });
});
