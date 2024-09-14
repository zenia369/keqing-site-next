import { RequestAddFavorite, RequestRemoveFavorite } from "@/app/api/character/favorite/route";
import { apiClient } from "@/shared/utils/api.client";

type PramsAddCharacterPhotoToFavorites = Omit<RequestAddFavorite, "userId">;
type PramsRemoveCharacterPhotoToFavorites = Omit<RequestRemoveFavorite, "userId">;

export const addCharacterPhotoToFavorites = async (
  data: PramsAddCharacterPhotoToFavorites
): Promise<void> => {
  return apiClient.patch<void, PramsAddCharacterPhotoToFavorites>("/api/character/favorite", data);
};

export const removeCharacterPhotoFromFavorites = async (
  data: PramsRemoveCharacterPhotoToFavorites
): Promise<void> => {
  return apiClient.patch<void, PramsRemoveCharacterPhotoToFavorites>(
    "/api/character/favorite",
    data
  );
};
