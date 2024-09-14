import { KqsStandCharacters, KqsStandCharactersPhoto } from "@prisma/client";
import Link from "next/link";
import { FC } from "react";

import StandItem from "./StandItem";

interface UserStandProps {
  stand: (Pick<KqsStandCharacters, "id" | "name" | "element"> & {
    images: Pick<KqsStandCharactersPhoto, "small"> | null;
  })[];
}

const UserStand: FC<UserStandProps> = ({ stand }) => {
  return (
    <ul className="flex flex-wrap gap-4 w-96 justify-center">
      {stand.map((character) => (
        <li key={character.id}>
          <StandItem isSlot character={character}>
            <Link
              href="/user/profile/stand"
              className="inline-block relative rounded group translate-y-0 hover:shadow-lg hover:translate-y-2 hover:shadow-white transition ease"
            />
          </StandItem>
        </li>
      ))}
    </ul>
  );
};

export default UserStand;
