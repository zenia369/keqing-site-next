import { KqsPictureFilter, KqsPictureLabel } from "@prisma/client";

import { PicturesFilter } from "../types";

export const transformQuery = (query: Record<string, string>, exclude: string[]): string[] => {
  const result = Object.entries(query)
    .filter(([key]) => !exclude.includes(key))
    .map(([, value]) => value.split(","))
    .flat();

  return result;
};

export const transformFilters = (
  filters: (KqsPictureLabel & {
    filters: Pick<KqsPictureFilter, "id" | "value">[];
  })[],
  query: string[]
): PicturesFilter => {
  return filters.map((f) => ({
    ...f,
    filters: f.filters.map((filterEl) => ({
      ...filterEl,
      checked: query.includes(filterEl.value),
    })),
  }));
};

export const hasNextPagination = (filteredPhotosCount: number, offset: number): boolean => {
  if (offset === 0 && filteredPhotosCount > 0) return true;

  return offset < filteredPhotosCount;
};
