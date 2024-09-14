"use client";

import { KqsCharacterPhoto, KqsStandCharactersPhoto } from "@prisma/client";
import Link from "next/link";
import { FC, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

import Button from "@/components/pages/character/Button";
import Tooltip from "@/components/ui/tooltip/Tooltip";
import { AppLinks } from "@/shared/appLinks";

import { removeCharacterPhotoFromFavorites } from "../../character/services";

interface FavoritesPhotoProps {
  photos: Pick<KqsStandCharactersPhoto, "id" | "small">[];
}

const FavoritesPhoto: FC<FavoritesPhotoProps> = ({ photos }) => {
  const [photosData, setPhotosData] = useState(photos);

  const handleClick = (characterId: KqsCharacterPhoto["id"]) => async () => {
    try {
      await removeCharacterPhotoFromFavorites({
        intent: "update:user:favorite:remove",
        characterId,
      });

      setPhotosData((prev) => prev.filter(({ id }) => id !== characterId));
    } catch (error) {
      // To-do handle error
    }
  };

  return (
    <section className="bg-purple-300 rounded py-6 px-2">
      <div>
        <p className="text-white text-2xl">Твої збережені ❤</p>
      </div>
      <div className="mt-7 ">
        {photosData.length ? (
          <ul className="list-none flex flex-wrap gap-1">
            {photosData.map(({ id, small }) => (
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
                  className="absolute z-10 top-1 right-1 invisible group-hover:visible"
                  onClick={handleClick(id)}
                >
                  <Tooltip text="Remove this photo from your favorites">
                    <FaHeart size={20} className="text-purple-500 shadow-l" />
                  </Tooltip>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex justify-center items-center flex-col gap-3">
            <p className="text-white text-xl">You look lonely, We can fix that</p>
            <Button asSlot className="text-white flex gap-1 items-center lowercase">
              <Link href={AppLinks.Characters}>
                Visit characters page <FiExternalLink />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesPhoto;
