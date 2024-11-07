import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Video from "./Video";

describe("<Video/>", () => {
  const mockVideoUrl = "mock-video-url";

  const mocks = vi.hoisted(() => ({
    useRouterBack: vi.fn(),
  }));

  vi.mock("next/navigation", async (importOriginal) => ({
    ...(await importOriginal),
    useRouter: () => ({ back: mocks.useRouterBack }),
  }));

  it("should render correctly", () => {
    render(<Video videoUrl={mockVideoUrl} />);

    expect(screen.getByTestId("video")).toHaveAttribute("src", mockVideoUrl);
    expect(screen.getByRole("button", { name: "Закрити" })).toBeInTheDocument();
  });

  it("should navigate back", async () => {
    render(<Video videoUrl={mockVideoUrl} />);

    await userEvent.click(screen.getByRole("button", { name: "Закрити" }));

    expect(mocks.useRouterBack).toHaveBeenCalledOnce();
  });
});
