import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppLinks } from "@/shared/appLinks";

import Navigation from "./Navigation";

describe("<Navigation/>", () => {
  const mockPageName = "mock-page-name";

  it("should render correctly", () => {
    render(<Navigation pageName={mockPageName} />);

    expect(screen.getByRole("link", { name: `Home page${`:/${mockPageName}`}` })).toHaveAttribute(
      "href",
      "/"
    );
    expect(screen.getByRole("link", { name: "Characters" })).toHaveAttribute(
      "href",
      AppLinks.Characters
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", AppLinks.About);
    expect(screen.getByRole("link", { name: "Profile" })).toHaveAttribute("href", AppLinks.Profile);
  });

  it("should render second priority links", () => {
    render(<Navigation pageName={mockPageName} isShowAboutPage isShowSendMessageLink />);

    expect(screen.getByRole("link", { name: "Send message" })).toHaveAttribute(
      "href",
      AppLinks.SendMessage
    );
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute("href", AppLinks.About);
  });
});
