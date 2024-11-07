import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import ModalLayout from "./ModalLayout";

describe("<ModalLayout/>", () => {
  it("should render correctly", () => {
    render(
      <ModalLayout>
        <div data-testid="test-component" />
      </ModalLayout>
    );

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });
});
