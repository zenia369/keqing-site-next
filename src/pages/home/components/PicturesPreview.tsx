import { AppLinks } from "@/shared/appLinks";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties, FC } from "react";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-21-32.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-22-20.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-22-32.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-22-37.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-22-48.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-22-51.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-22-54.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-23-04.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-23-10.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmain%2Fpictures%2Fphoto_2022-09-15_13-23-14.jpg?alt=media&token",
];

const PicturesPreview: FC = () => {
  return (
    <section className="flex flex-col items-center border-b-[16px] border-purple-200 rounded-b-xl">
      <h4 className="text-center bg-purple-200 rounded-t-xl text-xl text-black font-normal py-1 w-full">
        Тайват Через Фото
      </h4>
      <div className="pictures-preview-wrapper">
        {images.map((src, idx) => (
          <div
            key={"picture-key-" + idx}
            style={{ "--i": idx + 1 } as CSSProperties}
            className="pictures-preview-image"
          >
            <Image
              src={src}
              alt={`Pictures preview: ${idx}`}
              width={300}
              height={200}
            />
          </div>
        ))}
      </div>
      <Link
        href={AppLinks.Pictures}
        className="self-end text-black hover:underline"
      >
        View all »
      </Link>
    </section>
  );
};

export default PicturesPreview;
