import { KqsPicturePhoto } from "@prisma/client";

import { apiClient } from "@/shared/utils/api.client";

export interface GetPicturesResponse {
  photos: KqsPicturePhoto[];
  isNextPagination: boolean;
}

export const getPictures = async (url: string): Promise<GetPicturesResponse> => {
  return apiClient.get<GetPicturesResponse>(url);
};
