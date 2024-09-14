"use client";

import { KqsPicturePhoto } from "@prisma/client";
import { FC, useLayoutEffect, useReducer } from "react";

import Modal from "@/components/ui/modal/Modal";
import useSearchParams from "@/hooks/useSearchParams";
import { PicturesFilter } from "@/shared/types";

import Filter from "./components/filter/Filter";
import Gallery from "./components/gallery/Gallery";
import OpenImage from "./components/openImage/OpenImage";
import PaginationButton from "./components/paginationButton/PaginationButton";
import { DEFAULT_LIMIT_COUNT, DEFAULT_OFFSET_COUNT } from "./constants";
import usePicturesFilter from "./hooks/usePicturesFilter";
import { ActionTypes, initialState, reducer } from "./reducer";
import { GetPicturesResponse } from "./services";

interface PicturesProps {
  photos: KqsPicturePhoto[];
  filters: PicturesFilter;
  isNextPagination: boolean;
}

const Pictures: FC<PicturesProps> = ({ photos, filters, isNextPagination }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [state, dispatch] = useReducer(reducer, initialState, (state) => {
    const limit = searchParams.has("limit")
      ? Number(searchParams.get("limit"))
      : DEFAULT_LIMIT_COUNT;
    const offset = searchParams.has("offset")
      ? Number(searchParams.get("offset"))
      : DEFAULT_OFFSET_COUNT;

    return {
      ...state,
      filters,
      photos,
      isNextPagination,
      limit,
      offset,
    };
  });

  const filterQuery = usePicturesFilter(searchParams.toString(), {
    onSuccess(data: GetPicturesResponse) {
      dispatch({ type: "change_photos", payload: data });
    },
  });
  const paginationQuery = usePicturesFilter(searchParams.toString(), {
    onSuccess(data: GetPicturesResponse) {
      dispatch({
        type: "change_photos",
        payload: {
          photos: [...state.photos, ...data.photos],
          isNextPagination: data.isNextPagination,
        },
      });
    },
  });

  const isLoading = filterQuery.isMutating || paginationQuery.isMutating;

  const handlePagination = async () => {
    const action: ActionTypes = {
      type: "update_filter_offset",
      payload: state.offset + state.limit,
    };
    dispatch(action);
    const nextState = reducer(state, action);

    const nextSearchParams = new URLSearchParams(searchParams);

    nextSearchParams.set("limit", String(nextState.limit));
    nextSearchParams.set("offset", String(nextState.offset));

    paginationQuery.trigger(nextSearchParams.toString());
  };

  useLayoutEffect(() => {
    setSearchParams((prev) => {
      const filters = state.filters
        .map((f) => ({ ...f, filters: f.filters.filter(({ checked }) => checked) }))
        .map((f) => f.filters)
        .flat();

      if (filters.length) {
        prev.set("filters", filters.map(({ value }) => value).toString());
      } else {
        prev.delete("filters");
      }

      prev.set("limit", String(state.limit));
      prev.set("offset", String(state.offset));

      return prev;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <div className="grid grid-cols-[400px,_1fr] gap-7 ">
        <Filter
          limit={state.limit}
          isDisabled={isLoading}
          filterParams={state.filters}
          handleFilterClick={filterQuery.trigger}
          handleChangeRange={(value) => dispatch({ type: "update_filter_limit", payload: value })}
          handleUpdateFilter={(id, labelId) => () =>
            dispatch({ type: "update_filter", payload: { id, labelId } })}
        />
        <Gallery
          photos={state.photos}
          handleSelectImage={(value) => dispatch({ type: "update_selected_image", payload: value })}
        />
      </div>
      <PaginationButton
        handlePagination={handlePagination}
        isLoading={isLoading}
        isNextPagination={state.isNextPagination}
      />
      {state?.selectedImageId ? (
        <Modal>
          <OpenImage
            selectedImage={state.photos.find((p) => p.id === state.selectedImageId)!.path}
            handleChangeImage={(value) =>
              dispatch({ type: "change_selected_image", payload: value })
            }
          />
        </Modal>
      ) : null}
    </>
  );
};

export default Pictures;
