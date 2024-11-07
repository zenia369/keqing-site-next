import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Navigation, { charactersNavList } from "./Navigation";

describe("<Navigation/>", () => {
  it("should render correctly", () => {
    render(<Navigation />);

    charactersNavList.forEach((link) => {
      expect(screen.getByRole("link", { name: link.name })).toHaveAttribute("href", link.link);
    });
  });
});
