import { Metadata } from "next";
import { Merienda } from "next/font/google";
import Link from "next/link";

import Button from "@/components/pages/character/Button";
import Description from "@/components/pages/character/Description";
import Page from "@/components/ui/page/Page";
import { getCharacter, getCharacterMetadata } from "@/services/characters.service";

const meriendaFonts = Merienda({ subsets: ["latin"] });

export interface CharacterPageProps {
  params: { character: string };
}

export const generateMetadata = async ({ params }: CharacterPageProps): Promise<Metadata> => {
  const data = await getCharacterMetadata(params.character);

  if (!data)
    return {
      title: `Keqing | Characters | ${params.character}`,
    };

  return {
    title: `Keqing | Characters | ${data.name}`,
    description: `${data.description.substring(0, 90)}...`,
  };
};

export default async function Route({ params }: CharacterPageProps) {
  const data = await getCharacter(params.character);

  if (!data) throw new Error(`Character didn't find by slug: ${params.character}`);

  return (
    <Page classes="relative h-[100vh] overflow-hidden max-w-full">
      <h1 className={`text-center font-medium text-7xl ${meriendaFonts.className}`}>{data.name}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={data.photo}
        alt={data.name}
        className="absolute right-0 h-[90vh] translate-x-[20%] translate-y-[-50px] -z-10"
      />
      <Description description={data.description} />
      <div className="mt-12 flex items-center gap-5 justify-center">
        <Button asSlot>
          <Link href={`/characters/${params.character}/video`} prefetch>
            Подивитись відео
          </Link>
        </Button>
        <Button asSlot>
          <Link href={`/characters/${params.character}/photogallery`} prefetch>
            Фото галерея
          </Link>
        </Button>
      </div>
    </Page>
  );
}
