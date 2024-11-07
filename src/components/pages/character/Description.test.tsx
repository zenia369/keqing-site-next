import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Description from "./Description";

describe("<Description/>", () => {
  it("should render correctly", () => {
    const mockDescription = "mock-description";

    render(<Description description={mockDescription} />);

    expect(screen.getByText(mockDescription)).toBeInTheDocument();
    expect(screen.getByText("Зовнішність")).toBeInTheDocument();
  });
});
