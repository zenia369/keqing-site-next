"use client";

import useSWRMutation from "swr/mutation";

import { getPictures } from "../services";

const usePicturesFilter = (query: string, options?: object) => {
  return useSWRMutation(
    ["/api/pictures", query],
    (url: string[], { arg }: { arg?: string }) =>
      getPictures(typeof arg === "string" ? url.with(1, arg).join("?") : url.join("?")),
    options
  );
};

export default usePicturesFilter;
