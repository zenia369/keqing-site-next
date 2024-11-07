"use client";

import { KqsCharacterPhoto } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaExternalLinkSquareAlt } from "react-icons/fa";

import Tooltip from "@/components/ui/tooltip/Tooltip";
import { cn } from "@/shared/utils/common";

import Button from "./Button";
import { addCharacterPhotoToFavorites, removeCharacterPhotoFromFavorites } from "./services";

export interface PhotogalleryProps {
  photos: (Pick<KqsCharacterPhoto, "id" | "small" | "default"> & { isFavorite: boolean })[];
}

const Photogallery: FC<PhotogalleryProps> = ({ photos }) => {
  const router = useRouter();
  const [photosData, setPhotosData] = useState(photos);

  const handleBack = () => {
    router.back();
  };

  const handleFavoriteClick =
    (characterId: KqsCharacterPhoto["id"], isFavorite: boolean) => async () => {
      try {
        setPhotosData((prev) =>
          prev.map((p) => (p.id === characterId ? { ...p, isFavorite: !isFavorite } : p))
        );

        if (isFavorite) {
          await removeCharacterPhotoFromFavorites({
            intent: "update:user:favorite:remove",
            characterId,
          });
        } else {
          await addCharacterPhotoToFavorites({
            intent: "update:user:favorite:add",
            characterId,
          });
        }
      } catch (error) {
        // To-do handle error
        setPhotosData((prev) => prev.map((p) => (p.id === characterId ? { ...p, isFavorite } : p)));
      }
    };

  const handleOpenPhotoInNewTab = (url: string) => () => {
    window.open(url, "_blank");
  };

  return (
    <div className="h-full overflow-y-scroll bg-purple-200/50 py-2">
      <Button onClick={handleBack} className="sticky top-2 block mx-auto">
        Назад
      </Button>
      <ul className="mt-3 px-2 list-none flex flex-wrap gap-1">
        {photosData.map((photo) => (
          <li key={photo.id} className="group flex-grow h-44 relative" data-testid={photo.id}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photo.small}
              alt="character preview"
              loading="lazy"
              className="min-h-full min-w-full h-full aspect-[1/2] object-cover"
            />
            <button
              type="button"
              className="absolute z-10 top-1 right-8 invisible group-hover:visible"
              onClick={handleOpenPhotoInNewTab(photo.default)}
              data-testid="external_link_button"
            >
              <Tooltip text="Open photo in new tab">
                <FaExternalLinkSquareAlt
                  size={20}
                  className="text-purple-500 shadow-l"
                  data-testid="ExternalLinkIcon"
                />
              </Tooltip>
            </button>
            <button
              type="button"
              className={cn("absolute z-10 top-1 right-1", {
                ["visible"]: photo.isFavorite,
                ["invisible group-hover:visible"]: !photo.isFavorite,
              })}
              onClick={handleFavoriteClick(photo.id, photo.isFavorite)}
              data-testid="heart_button"
            >
              <Tooltip
                text={
                  photo.isFavorite
                    ? "Remove this photo from your favorites"
                    : "Add this photo to your favorites"
                }
              >
                <FaHeart
                  size={20}
                  className={cn("text-purple-300 shadow-lg", {
                    "text-purple-500": photo.isFavorite,
                  })}
                  data-testid="HeartIcon"
                />
              </Tooltip>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Photogallery;
