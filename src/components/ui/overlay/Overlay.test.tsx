import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Overlay from "./Overlay";

describe("<Overlay/>", () => {
  it("should render correctly", () => {
    render(
      <Overlay backgroundUrl="foo">
        <div data-testid="test-component" />
      </Overlay>
    );

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });
});
