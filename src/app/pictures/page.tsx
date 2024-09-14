import { Suspense } from "react";

import { DEFAULT_LIMIT_COUNT, DEFAULT_OFFSET_COUNT } from "@/components/pages/pictures/constants";
import Pictures from "@/components/pages/pictures/Pictures";
import Footer from "@/components/ui/footer/Footer";
import Main from "@/components/ui/main/Main";
import Navigation from "@/components/ui/navigation/Navigation";
import Page from "@/components/ui/page/Page";
import {
  getPictureLabels,
  getPicturePhotos,
  getPicturePhotosCount,
} from "@/services/pictures.service";
import prisma from "@/shared/db.server";
import {
  hasNextPagination,
  transformFilters,
  transformQuery,
} from "@/shared/utils/pictures.helpers";

export default async function Route({ searchParams }: { searchParams: Record<string, string> }) {
  const filterValues = transformQuery(searchParams, ["offset", "limit"]);
  const offset = Number(searchParams["offset"] ?? DEFAULT_OFFSET_COUNT);
  const limit = Number(searchParams["limit"] ?? DEFAULT_LIMIT_COUNT);

  const [photos, filteredPhotosCount, filters] = await prisma.$transaction([
    getPicturePhotos(filterValues, offset, limit),
    getPicturePhotosCount(filterValues),
    getPictureLabels(),
  ]);

  const isNextPagination = hasNextPagination(filteredPhotosCount, offset + limit);

  const filtersData = transformFilters(filters, filterValues);

  return (
    <>
      <Page>
        <Navigation pageName="Teyvat" isShowSendMessageLink={false} />
        <Main classes="min-h-[100vh]">
          <Suspense>
            <Pictures photos={photos} filters={filtersData} isNextPagination={isNextPagination} />
          </Suspense>
        </Main>
      </Page>
      <Footer />
    </>
  );
}
