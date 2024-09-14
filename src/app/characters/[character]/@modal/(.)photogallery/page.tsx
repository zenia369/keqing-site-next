import Photogallery from "@/components/pages/character/Photogallery";
import Modal from "@/components/ui/modal/Modal";
import {
  getCharacterPhotogalleryPhotos,
  getUserFavoritesCharacterPhotosByIdentityId,
} from "@/services/characters.service";
import { getAuthUser } from "@/services/clerk.service";
import prisma from "@/shared/db.server";

import { CharacterPageProps } from "../../page";

export default async function Route({ params }: CharacterPageProps) {
  const user = await getAuthUser();

  const [characterImages, userFavorites] = await prisma.$transaction([
    getCharacterPhotogalleryPhotos(params.character),
    getUserFavoritesCharacterPhotosByIdentityId(user.id, params.character),
  ]);

  if (!characterImages) {
    throw new Error(`Character images didn't find by slug: ${params.character}`);
  }
  if (!userFavorites) {
    throw new Error(`No user favorites found by slug: ${params.character}`);
  }

  const userFavoritesIds = userFavorites.map((p) => p.id);
  const photos = characterImages.map((p) => ({
    ...p,
    isFavorite: userFavoritesIds.includes(p.id),
  }));

  return (
    <Modal>
      <div className="fixed h-full w-full bg-white top-0 left-0">
        <Photogallery photos={photos} />
      </div>
    </Modal>
  );
}
