import { KqsCharacter, KqsResource } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";
import { TbExternalLink } from "react-icons/tb";

export interface CharactersCardProps {
  card: KqsResource & {
    characters: Pick<KqsCharacter, "id" | "previewName" | "slug" | "previewPhoto">[];
  };
}

const CharactersCard: FC<CharactersCardProps> = ({ card }) => {
  return (
    <div className="w-4/5 rounded-[30px] border border-gray-400/50 px-5 py-4 shadow-lg">
      <div className="flex gap-4 items-center mb-3">
        <Link
          href={card.link}
          className="text-purple-500 text-3xl flex items-center gap-2"
          prefetch={false}
        >
          {card.name} <TbExternalLink className="text-xl" data-testid="ExternalLinkIcon" />
        </Link>
        <div
          className="rounded-full w-12 h-12 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${card.photo})` }}
          aria-label={`game poster: ${card.name}`}
        />
      </div>
      <ul className="flex gap-3 overflow-x-auto">
        {card.characters.map((character) => (
          <li key={character.id} className="relative" data-testid={character.id}>
            <Link
              href={`/characters/${character.slug}`}
              className="group block w-28 h-44 bg-no-repeat bg-cover rounded-lg"
              style={{ backgroundImage: `url(${character.previewPhoto})` }}
            >
              <div className="absolute w-full h-full rounded-lg flex justify-center items-center bg-black/40 text-center opacity-0 group-hover:opacity-100 hover:ease-in-out transition duration-150">
                <p className="text-white scale-90 text-lg group-hover:scale-110 hover:ease-in-out transition duration-200">
                  {character.previewName}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CharactersCard;
