import { DEFAULT_LIMIT_COUNT, DEFAULT_OFFSET_COUNT } from "@/components/pages/pictures/constants";
import { getPicturePhotos, getPicturePhotosCount } from "@/services/pictures.service";
import prisma from "@/shared/db.server";
import { hasNextPagination, transformQuery } from "@/shared/utils/pictures.helpers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") ?? DEFAULT_OFFSET_COUNT);
  const limit = Number(searchParams.get("limit") ?? DEFAULT_LIMIT_COUNT);

  const filterValues = transformQuery(Object.fromEntries(searchParams), ["offset", "limit"]);

  const [photos, filteredPhotosCount] = await prisma.$transaction([
    getPicturePhotos(filterValues, offset, limit),
    getPicturePhotosCount(filterValues),
  ]);

  const isNextPagination = hasNextPagination(filteredPhotosCount, offset + limit);

  return Response.json({ photos, isNextPagination });
}
