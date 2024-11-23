import { Metadata } from "next";

import CharactersCard from "@/components/pages/characters/CharactersCard";
import Navigation from "@/components/pages/characters/navigation/Navigation";
import Main from "@/components/ui/main/Main";
import Page from "@/components/ui/page/Page";
import { getCharactersCard } from "@/services/characters.service";

export const metadata: Metadata = {
  title: "Keqing | Characters",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

export default async function Route() {
  const cards = await getCharactersCard();

  return (
    <Page>
      <Navigation />
      <Main>
        <h2 className="kq-text-600 text-5xl font-semibold">Персонажі</h2>
        <section className="flex flex-col gap-4">
          {cards.map((c) => (
            <CharactersCard key={c.id} card={c} />
          ))}
        </section>
      </Main>
    </Page>
  );
}
