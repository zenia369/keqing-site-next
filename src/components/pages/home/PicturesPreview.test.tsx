import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppLinks } from "@/shared/appLinks";

import PicturesPreview, { images } from "./PicturesPreview";

describe("<PicturesPreview/>", () => {
  it("should render correctly", () => {
    render(<PicturesPreview />);

    expect(screen.getByRole("heading", { level: 4 })).toHaveTextContent("Тайват Через Фото");
    expect(screen.getByRole("link", { name: /View all »/i })).toHaveAttribute(
      "href",
      AppLinks.Pictures
    );
    expect(screen.getAllByRole("img")).toHaveLength(images.length);
  });
});
