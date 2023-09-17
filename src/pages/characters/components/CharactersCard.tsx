import Link from "next/link";
import { FC } from "react";
import { TbExternalLink } from "react-icons/tb";

interface CharactersCardProps {
  game_href: string;
  game_poster: string;
  game_name: string;
  items: {
    name: string;
    url: string;
    poster: string;
  }[];
}

const CharactersCard: FC<CharactersCardProps> = ({
  game_href,
  game_name,
  game_poster,
  items,
}) => {
  return (
    <div className="w-4/5 rounded-[30px] border border-gray-400/50 px-5 py-4 shadow-lg">
      <div className="flex gap-4 items-center mb-3">
        <Link
          href={game_href}
          className="text-purple-500 text-3xl flex items-center gap-2"
          prefetch={false}
        >
          {game_name} <TbExternalLink className="text-xl" />
        </Link>
        <div
          className="rounded-full w-12 h-12 bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${game_poster})` }}
          aria-label={`game poster: ${game_name}`}
        />
      </div>
      <ul className="flex gap-3 overflow-x-auto">
        {items.map((character) => (
          <li key={character.name} className="relative">
            <Link
              href={character.url}
              className="group block w-28 h-44 bg-no-repeat bg-cover rounded-lg"
              style={{ backgroundImage: `url(${character.poster})` }}
              prefetch={false}
            >
              <div className="absolute w-full h-full rounded-lg flex justify-center items-center bg-black/40 text-center opacity-0 group-hover:opacity-100 hover:ease-in-out transition duration-150">
                <p className="text-white scale-90 group-hover:scale-110 hover:ease-in-out transition duration-200">
                  {character.name}
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
