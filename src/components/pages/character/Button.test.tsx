import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Button from "./Button";

describe("<Button/>", () => {
  it("should render correctly", () => {
    const mockText = "mock-text";

    render(<Button>{mockText}</Button>);

    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  it("should render slot", () => {
    const TestComponent = () => <div data-testid="test-component" />;

    render(
      <Button asSlot>
        <TestComponent />
      </Button>
    );

    expect(screen.getByTestId("test-component")).toBeInTheDocument();
  });
});
