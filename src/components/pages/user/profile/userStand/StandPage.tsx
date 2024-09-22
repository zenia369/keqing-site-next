"use client";

import { KqsStandCharacters } from "@prisma/client";
import { useState } from "react";

import ModalContent from "@/components/pages/user/profile/ModalContent";
import Modal from "@/components/ui/modal/Modal";

import { updateUserStand } from "../services";
import StandItem from "./StandItem";

type StandData = (Omit<KqsStandCharacters, "background"> & {
  images: {
    small?: string;
    default?: string;
  } | null;
})[];

type StandPageProps = {
  charactersData: StandData;
  standData: StandData;
};

const StandPage = ({ charactersData, standData }: StandPageProps) => {
  const [stand, setStand] = useState(standData);
  const [characterId, setCharacterId] = useState<string | undefined>(stand.at(0)?.id);

  const handleSaveChanges = async () => {
    const standCharactersIds = stand.map(({ id }) => id);

    try {
      await updateUserStand({
        standCharactersIds,
      });
    } catch (error) {}
  };

  const handleClick = (characterId: string) => () => {
    setCharacterId(characterId);
  };

  const handleClickStandCharacter = (selectedId: string) => () => {
    if (stand.some(({ id }) => selectedId === id)) return;

    setStand((prev) =>
      prev.map((character) => {
        if (characterId !== character.id) return character;

        return charactersData.find(({ id }) => selectedId === id)!;
      })
    );
    setCharacterId(selectedId);
  };

  return (
    <Modal>
      <ModalContent handleSaveChanges={handleSaveChanges} title="Оновити стенд з героями">
        <div className="mt-5 flex gap-10">
          <ul className="pt-5 w-96 h-fit grid gap-4 grid-cols-4 grid-rows-2 justify-items-start">
            {stand.map((character) => (
              <StandItem
                key={character.id}
                isSlot={false}
                character={character}
                handleClick={handleClick(character.id)}
                activeId={characterId}
              />
            ))}
          </ul>
          <ul className="p-5 flex-1 flex flex-wrap gap-4 justify-center overflow-y-auto h-[500px]">
            {charactersData.map((character) => (
              <StandItem
                key={character.id}
                isSlot={false}
                character={character}
                handleClick={handleClickStandCharacter(character.id)}
              />
            ))}
          </ul>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default StandPage;
