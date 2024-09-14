import { KqsPicturePhoto } from "@prisma/client";
import { FC } from "react";

interface GalleryProps {
  photos: KqsPicturePhoto[];
  handleSelectImage: (id: string) => void;
}

const Gallery: FC<GalleryProps> = ({ photos, handleSelectImage }) => {
  if (!photos?.length)
    return (
      <p className="text-center py-1 px-2 bg-slate-300 h-fit rounded">
        Щось жодного фото не знайти
      </p>
    );

  return (
    <ul className="flex flex-wrap gap-1 content-start">
      {photos.map((i) => (
        <li key={i.id} className="h-52 aspect-[3/2] flex-grow">
          <button onClick={() => handleSelectImage(i.id)} className="h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={i.path}
              alt={`pictures image by id:${i.id}`}
              className="rounded-md object-cover h-full w-full hover:brightness-50"
            />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Gallery;
