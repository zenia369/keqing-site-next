"use client";

import { useSearchParams as useSearchParamsNext } from "next/navigation";
import { useCallback, useLayoutEffect, useState } from "react";

type SetSearchParamsFn = (
  // eslint-disable-next-line no-unused-vars
  value: URLSearchParams | ((value: URLSearchParams) => URLSearchParams)
) => void;

let GLOBAL_SEARCH_PARAMS: URLSearchParams | undefined = undefined;

const getGlobalSearchParams = (searchParams: URLSearchParams) => {
  if (!GLOBAL_SEARCH_PARAMS) {
    GLOBAL_SEARCH_PARAMS = new URLSearchParams(searchParams.toString());
  }

  return GLOBAL_SEARCH_PARAMS;
};

const useSearchParams = () => {
  const searchParams = useSearchParamsNext();
  const [value, setValue] = useState(getGlobalSearchParams(searchParams));

  const setSearchParams: SetSearchParamsFn = useCallback((newSearchValue) => {
    let newSearchParams: URLSearchParams;

    if (typeof newSearchValue === "function") {
      setValue((prev) => {
        newSearchParams = new URLSearchParams(
          newSearchValue(GLOBAL_SEARCH_PARAMS ?? prev).toString()
        );
        GLOBAL_SEARCH_PARAMS = newSearchParams;

        return newSearchParams;
      });

      return;
    }

    newSearchParams = new URLSearchParams(newSearchValue.toString());
    setValue(newSearchParams);

    GLOBAL_SEARCH_PARAMS = newSearchParams;
  }, []);

  useLayoutEffect(() => {
    window.history.replaceState(
      null,
      "",
      `${window.location.origin}${window.location.pathname}?${value.toString()}`
    );
  }, [value]);

  return [value, setSearchParams] as const;
};

export default useSearchParams;
