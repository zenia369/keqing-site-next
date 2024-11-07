import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import NavListItem from "./NavListItem";

describe("<NavListItem/>", () => {
  it("should render correctly", () => {
    const mockHref = "mock-href";
    const mockText = "mock-text";
    const mockTooltipText = "mock-tooltip-text";

    render(<NavListItem href={mockHref} text={mockText} tooltipText={mockTooltipText} />);

    expect(screen.getByRole("link", { name: mockText })).toBeInTheDocument();
  });
});
