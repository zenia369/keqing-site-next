import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import CharactersCard, { CharactersCardProps } from "./CharactersCard";

describe("<CharactersCard/>", () => {
  const mockCard: CharactersCardProps["card"] = {
    name: "card-name",
    id: "0",
    photo: "mock/photo",
    link: "mock/link",
    characters: [
      {
        id: "1",
        previewName: "mock-name",
        previewPhoto: "mock-photo",
        slug: "mock-slug",
      },
    ],
  };

  it("should render correctly", () => {
    render(<CharactersCard card={mockCard} />);

    expect(screen.getByRole("link", { name: mockCard.name })).toHaveAttribute(
      "href",
      mockCard.link
    );
    expect(
      within(screen.getByRole("link", { name: mockCard.name })).getByTestId("ExternalLinkIcon")
    ).toBeInTheDocument();
    expect(screen.getByLabelText(`game poster: ${mockCard.name}`)).toBeInTheDocument();

    mockCard.characters.forEach((ch) => {
      const rootEl = within(screen.getByTestId(ch.id));

      expect(rootEl.getByRole("link")).toHaveAttribute("href", `/characters/${ch.slug}`);
      expect(rootEl.getByRole("paragraph")).toHaveTextContent(ch.previewName);
    });
  });
});
