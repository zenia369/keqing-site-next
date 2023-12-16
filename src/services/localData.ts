import picturesData from "@/shared/mocks/pictures_data.json";

export type PicturesData = typeof picturesData;
export type PictureItemKeys = "labes" | "tags" | "regions";

export const getPicturesPhoto = (
  limit: number,
  offset: number,
  filterQuery: Record<PictureItemKeys, string>
) => {
  const filteredPictures = filterPicturesPhoto(filterQuery);
  const pictures = filteredPictures.slice(offset, offset + limit).map((el) => ({
    path: el.path,
    id: el.id,
  }));

  const isNextPage = pictures.length + offset < filteredPictures.length;

  return {
    isNextPage,
    offset: offset,
    limit: limit,
    count: pictures.length,
    items: pictures,
  };
};

export const filterPicturesPhoto = (
  filterBy: Record<PictureItemKeys, string>
): PicturesData["items"] => {
  const filterItemsArray = new Map(Object.entries(filterBy));
  let filteredItems: PicturesData["items"] = [];

  if (filterItemsArray.size > 0) {
    filteredItems = picturesData.items.filter((item) => {
      let isExist = 0;

      filterItemsArray.forEach((filter, key) => {
        const elements = filter.split(",");

        elements.forEach((el) => {
          if ((item[key as PictureItemKeys] as string[])?.includes(el)) {
            isExist += 1;
          }
        });
      });

      return isExist > 0;
    });
  } else {
    filteredItems = picturesData.items;
  }

  return filteredItems;
};
