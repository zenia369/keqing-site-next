import prisma from "@/shared/db.server";

export const getPicturePhotos = (filterValues: string[], offset: number, limit: number) =>
  prisma.kqsPicturePhoto.findMany({
    where: filterValues.length
      ? {
          filters: {
            some: {
              value: {
                in: filterValues,
              },
            },
          },
        }
      : {},
    skip: offset,
    take: limit,
  });

export const getPicturePhotosCount = (filterValues: string[]) =>
  prisma.kqsPicturePhoto.count({
    where: filterValues.length
      ? {
          filters: {
            some: {
              value: {
                in: filterValues,
              },
            },
          },
        }
      : {},
  });

export const getPictureLabels = () =>
  prisma.kqsPictureLabel.findMany({
    select: {
      id: true,
      value: true,
      filters: {
        select: {
          value: true,
          id: true,
        },
      },
    },
  });
