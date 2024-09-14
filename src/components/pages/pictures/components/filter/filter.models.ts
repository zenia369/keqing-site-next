import { PicturesFilter } from "@/shared/types";

export interface FilterProps {
  limit: number;
  isDisabled: boolean;
  filterParams: PicturesFilter;
  handleFilterClick: () => void;
  handleUpdateFilter: (id: string, labelId: string) => () => void;
  handleChangeRange: (value: number) => void;
}

export interface FilterCardProps {
  item: FilterProps["filterParams"][number];
  onClick: (id: string, labelId: string) => () => void;
}
