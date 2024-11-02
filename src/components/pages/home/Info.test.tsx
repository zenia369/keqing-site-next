import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppLinks } from "@/shared/appLinks";

import Info, { images } from "./Info";

describe("<Info/>", () => {
  it("should render correctly", () => {
    render(<Info />);

    expect(screen.getByRole("link", { name: "ще..." })).toHaveAttribute(
      "href",
      AppLinks.KeqingPage
    );
    expect(within(screen.getByTestId(/info_images_wrapper/i)).getAllByRole("img")).toHaveLength(
      images.length
    );
    expect(screen.getByRole("heading", { level: 4, name: "Галерея Кей" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 4, name: "Голосові історії" })).toBeInTheDocument();
    expect(screen.getByTestId(/info_image_electro/i)).toBeInTheDocument();
  });
});
