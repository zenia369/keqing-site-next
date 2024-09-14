import { KqsPicturePhoto } from "@prisma/client";

import { PicturesFilter } from "@/shared/types";

import { DEFAULT_LIMIT_COUNT, DEFAULT_OFFSET_COUNT } from "./constants";

export type ActionTypes =
  | { type: "change_filter"; payload: KqsPicturePhoto[] }
  | {
      type: "change_photos";
      payload: {
        photos: KqsPicturePhoto[];
        isNextPagination: boolean;
      };
    }
  | { type: "change_selected_image"; payload?: "left" | "right" }
  | { type: "update_selected_image"; payload: string }
  | { type: "update_filter_limit"; payload: number }
  | { type: "update_filter_offset"; payload: number }
  | { type: "update_filter"; payload: { id: string; labelId: string } };

type InitialState = {
  offset: number;
  limit: number;
  photos: KqsPicturePhoto[];
  filters: PicturesFilter;
  selectedImageId: null | string;
  isNextPagination: boolean;
};

export const initialState: InitialState = {
  limit: DEFAULT_LIMIT_COUNT,
  offset: DEFAULT_OFFSET_COUNT,
  filters: [],
  photos: [],
  selectedImageId: null,
  isNextPagination: false,
};

export const reducer = (state: typeof initialState, action: ActionTypes): InitialState => {
  switch (action.type) {
    case "change_photos":
      return {
        ...state,
        photos: action.payload.photos,
        isNextPagination: action.payload.isNextPagination,
      };
    case "change_selected_image": {
      if (!action.payload) return { ...state, selectedImageId: null };

      const selectedImageIndex = state.photos.findIndex(({ id }) => state.selectedImageId === id);

      if (selectedImageIndex < 0) return state;

      const elementIndex =
        action.payload === "left" ? selectedImageIndex - 1 : selectedImageIndex + 1;
      const newSelectedImage = state.photos.at(elementIndex < 0 ? 0 : elementIndex);

      if (newSelectedImage) {
        return { ...state, selectedImageId: newSelectedImage.id };
      }

      return state;
    }
    case "update_selected_image":
      return { ...state, selectedImageId: action.payload };
    case "update_filter_limit":
      return {
        ...state,
        limit: action.payload,
        offset: 0,
      };
    case "update_filter_offset":
      return {
        ...state,
        offset: action.payload,
      };
    case "update_filter":
      return {
        ...state,
        offset: 0,
        filters: state.filters.map((f) => {
          if (f.id !== action.payload.labelId) return f;

          return {
            ...f,
            filters: f.filters.map((filterEl) =>
              filterEl.id === action.payload.id
                ? {
                    ...filterEl,
                    checked: !filterEl.checked,
                  }
                : filterEl
            ),
          };
        }),
      };
    default:
      return state;
  }
};
