import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppLinks } from "@/shared/appLinks";

import Header from "./Header";

describe("<Header/>", () => {
  it("should render correctly", () => {
    render(<Header />);

    expect(screen.getByRole("heading", { level: 1, name: "Keqing/Ке Цин" })).toBeInTheDocument();
    expect(screen.getByTestId(/header_image_keqing/i)).toBeInTheDocument();
    expect(screen.getByTestId(/header_image_electro/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /дуже цікаво, хочу ще.../i })).toHaveAttribute(
      "href",
      AppLinks.KeqingPage
    );
  });
});
