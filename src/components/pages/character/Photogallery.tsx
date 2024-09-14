"use client";

import { KqsCharacterPhoto } from "@prisma/client";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { FaHeart } from "react-icons/fa";

import Tooltip from "@/components/ui/tooltip/Tooltip";
import { cn } from "@/shared/utils/common";

import Button from "./Button";
import { addCharacterPhotoToFavorites, removeCharacterPhotoFromFavorites } from "./services";

interface PhotogalleryProps {
  photos: (Pick<KqsCharacterPhoto, "id" | "small"> & { isFavorite: boolean })[];
}

const Photogallery: FC<PhotogalleryProps> = ({ photos }) => {
  const router = useRouter();
  const [photosData, setPhotosData] = useState(photos);

  const handleBack = () => {
    router.back();
  };

  const handleClick = (characterId: KqsCharacterPhoto["id"], isFavorite: boolean) => async () => {
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

  return (
    <div className="h-full overflow-y-scroll bg-purple-200/50 py-2">
      <Button onClick={handleBack} className="sticky top-2 block mx-auto">
        Назад
      </Button>
      <ul className="mt-3 px-2 list-none flex flex-wrap gap-1">
        {photosData.map(({ id, small, isFavorite }) => (
          <li key={id} className="group flex-grow h-44 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={small}
              alt="character preview"
              loading="lazy"
              className="min-h-full min-w-full h-full aspect-[1/2] object-cover"
            />
            <button
              type="button"
              className={cn("absolute z-10 top-1 right-1", {
                ["visible"]: isFavorite,
                ["invisible group-hover:visible"]: !isFavorite,
              })}
              onClick={handleClick(id, isFavorite)}
            >
              <Tooltip
                text={
                  isFavorite
                    ? "Remove this photo from your favorites"
                    : "Add this photo to your favorites"
                }
              >
                <FaHeart
                  size={20}
                  className={cn("text-purple-300 shadow-lg", {
                    "text-purple-500": isFavorite,
                  })}
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
