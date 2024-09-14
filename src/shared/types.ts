import { KqsPictureFilter, KqsPictureLabel } from "@prisma/client";

import mockCharactersData from "@/shared/mocks/characters_images_data";
import picturesData from "@/shared/mocks/pictures_data.json";

export type PicturesData = typeof picturesData;
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

export type CharacterStandItem = (typeof mockCharactersData)[number];
