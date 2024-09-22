import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import electroIcon from "@/assets/images/electro.png";
import { AppLinks } from "@/shared/appLinks";

import Card from "./components/Card";

const images = [
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-06-02.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-08-13.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-07-54.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-09-19.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-05-37.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-06-39.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-08-46.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-10-20.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fphoto_2021-12-24_22-09-37.jpg?alt=media&token",
  "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fkeqing%2Fimage%2Fkeqing-1.jpg?alt=media&token",
];

const Info: FC = () => {
  return (
    <section className="flex gap-8">
      <Card title="Галерея Кей">
        <Link
          href={AppLinks.KeqingPage}
          className="absolute right-0 bottom-0 bg-purple-400 h-[100.5%] writing-mode-v-rl rotate-180 text-center text-sm rounded-r-xl hover:text-white text-black py-2"
        >
          ще...
        </Link>
        <div className="flex overflow-hidden gap-3">
          {images.map((src, idx) => (
            <Image
              key={`keqing-info-${idx}`}
              src={src}
              width={70}
              height={90}
              alt={`Keqing photo: ${idx}`}
            />
          ))}
        </div>
      </Card>
      <Card title="Голосові історії" classes="justify-center gap-4 w-fit px-3">
        <Image src={electroIcon} alt="electro" width={35} height={35} />
        <audio controls src="/audio/keqing-voice-history.mp3" aria-label="Keqing voice history" />
      </Card>
    </section>
  );
};

export default Info;
