import { KqsPictureFilter, KqsPictureLabel } from "@prisma/client";

export type PictureItemKeys = "labes" | "tags" | "regions";
export type PicturesFilteredItame = {
  path: string;
  id: string;
};

export type PicturesFilter = (KqsPictureLabel & {
  filters: (Pick<KqsPictureFilter, "id" | "value"> & { checked: boolean })[];
})[];

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & unknown;

export type CharacterData = {
  slug: string;
  image: string;
  description: string;
  title: string;
  videoUrl: string;
};

export type CharacterImage = {
  smallImage: string;
  bigImage: string;
};

export type User = {
  id: string;
  name: string;
  city: string;
  elemental: string;
  avatar: string;
  card: string;
};

export type UserStandItem = {
  id: string;
  name: string;
  element: string;
  photo: string;
};
