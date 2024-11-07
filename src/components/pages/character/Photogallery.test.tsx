import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Photogallery, { PhotogalleryProps } from "./Photogallery";

describe("<Photogallery/>", () => {
  const mocks = vi.hoisted(() => ({
    useRouterBack: vi.fn(),
  }));

  vi.mock("next/navigation", async (importOriginal) => ({
    ...(await importOriginal),
    useRouter: () => ({ back: mocks.useRouterBack }),
  }));

  const fetchSpy = vi.spyOn(window, "fetch");
  const mockWindowOpen = vi.fn();
  vi.stubGlobal("open", mockWindowOpen);

  const mockPhotos: PhotogalleryProps["photos"] = [
    {
      id: "1",
      default: "mock/default",
      isFavorite: false,
      small: "mock/small",
    },
    {
      id: "2",
      default: "mock/default-2",
      isFavorite: true,
      small: "mock/small-2",
    },
  ];

  const renderComponent = () =>
    render(<Photogallery photos={mockPhotos} />, {
      wrapper: ({ children }) => (
        <>
          {children}
          <div id="modal-root" />
        </>
      ),
    });

  it("should render correctly", () => {
    renderComponent();

    expect(screen.getByText("Назад")).toBeInTheDocument();

    mockPhotos.forEach((photo) => {
      const rootEl = within(screen.getByTestId(photo.id));

      expect(rootEl.getByRole("img")).toHaveAttribute("src", photo.small);
      expect(rootEl.getByTestId("external_link_button")).toBeInTheDocument();
      expect(rootEl.getByTestId("heart_button")).toBeInTheDocument();

      fireEvent.mouseEnter(rootEl.getByTestId("HeartIcon"));

      expect(screen.getByRole("tooltip")).toHaveTextContent(
        photo.isFavorite
          ? "Remove this photo from your favorites"
          : "Add this photo to your favorites"
      );

      fireEvent.mouseLeave(rootEl.getByTestId("HeartIcon"));
    });
  });

  it("should open default image", async () => {
    const mockPhoto = mockPhotos.at(0)!;

    renderComponent();

    const rootEl = within(screen.getByTestId(mockPhoto.id));

    await userEvent.click(rootEl.getByTestId("external_link_button"));

    expect(mockWindowOpen).toHaveBeenCalledWith(mockPhoto.default, "_blank");
  });

  it("should navigate back", async () => {
    renderComponent();

    await userEvent.click(screen.getByText("Назад"));

    expect(mocks.useRouterBack).toHaveBeenCalledOnce();
  });

  it.each([
    [
      "make photo favorite",
      mockPhotos.at(0)!,
      {
        intent: "update:user:favorite:add",
        characterId: mockPhotos.at(0)!.id,
      },
    ],
    [
      "remove photo from favorite",
      mockPhotos.at(1)!,
      {
        intent: "update:user:favorite:remove",
        characterId: mockPhotos.at(1)!.id,
      },
    ],
  ])("should %s", async (_, mockPhoto, expectedData) => {
    renderComponent();

    const rootEl = within(screen.getByTestId(mockPhoto.id));

    await userEvent.click(rootEl.getByTestId("heart_button"));

    expect(fetchSpy).toHaveBeenCalledWith("/api/character/favorite", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expectedData),
    });
  });
});
