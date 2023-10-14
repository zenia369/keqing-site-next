import { Metadata } from "next";

import Page from "@/components/ui/page/Page";
import Main from "@/components/ui/main/Main";
import CharactersCard from "@/components/pages/characters/CharactersCard";
import Navigation from "@/components/pages/characters/navigation/Navigation";

export const metadata: Metadata = {
  title: "Keqing | Characters",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

const data = [
  {
    game_href: "https://genshin.mihoyo.com",
    game_poster:
      "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmy-wife%2Fimage%2Fgenshin-impact.jpeg?alt=media&token=9ce23e16-9385-4334-b972-8d753c5c7c85",
    game_name: "Genshin Impact",
    items: [
      {
        name: "Kamisato Ayaka",
        url: "/characters/ayaka",
        poster:
          "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmy-wife%2Fimage%2Fayaka.jpg?alt=media&token=c08605b8-1f37-40c3-9e80-c69c728b3528",
      },
      {
        name: "Keqing",
        url: "/characters/keqing",
        poster:
          "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmy-wife%2Fimage%2Fkeqing.png?alt=media&token=224dcdbb-444d-4f10-9494-fc6c89a790c8",
      },
      {
        name: "Shogun Raiden",
        url: "/characters/raiden",
        poster:
          "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmy-wife%2Fimage%2Fraiden.jpg?alt=media&token=876d0db0-e18b-4cb1-afc7-dbf100bc3931",
      },
      {
        name: "Yae Miko",
        url: "/characters/miko",
        poster:
          "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fmiko%2Ffull-size-image%2Fphoto_2022-07-29_11-52-02.jpg?alt=media&token=5c090754-cb79-429a-b115-1d4f7c0056e5",
      },
    ],
  },
  {
    game_href: "#",
    game_poster:
      "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/page%60s%2Fmy-wife%2Fimage%2FChainsawman.jpg?alt=media&token=c17c27ff-ba3b-43a3-87b5-be0359983dcd",
    game_name: "Manga/Manhwa",
    items: [
      {
        name: "Makima",
        url: "/characters/makima",
        poster:
          "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fmakima%2Fimage%2Fmakima-17.jfif?alt=media&token=e78d23dc-a02b-44bc-a6c0-3e87307ae87f",
      },
      {
        name: "Yuri Zahard",
        url: "/characters/yuri",
        poster:
          "https://firebasestorage.googleapis.com/v0/b/keqing-gallery.appspot.com/o/characters%2Fyuri%2Fimage%2Fyuri-23.jfif?alt=media&token=8366b5bb-0c2d-4b28-a878-52f0959e3418",
      },
    ],
  },
];

export default function Route() {
  return (
    <Page>
      <Navigation />
      <Main>
        <h2 className="kq-text-600 text-5xl font-semibold">Characters</h2>
        <section className="flex flex-col gap-4">
          {data.map((d) => (
            <CharactersCard key={d.game_name} {...d} />
          ))}
        </section>
      </Main>
    </Page>
  );
}
