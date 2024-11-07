import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AppLinks, NavNames } from "@/shared/appLinks";

import Footer from "./Footer";

describe("<Footer/>", () => {
  it("should render correctly", () => {
    render(<Footer />);

    expect(screen.getByText("По запитаням звертатись у формі рецензії.")).toBeInTheDocument();
    expect(screen.getByTestId("FlagIcon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: NavNames.SendMessage })).toHaveAttribute(
      "href",
      AppLinks.SendMessage
    );
  });

  it("should not render link", () => {
    render(<Footer showLink={false} />);

    expect(screen.queryByRole("link", { name: NavNames.SendMessage })).not.toBeInTheDocument();
  });
});
