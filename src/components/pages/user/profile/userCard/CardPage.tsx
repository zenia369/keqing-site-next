"use client";

import { KqsProfile, KqsStandCharacters, KqsStandCharactersPhoto } from "@prisma/client";
import { useState } from "react";

import ModalContent from "@/components/pages/user/profile/ModalContent";
import Avatar from "@/components/pages/user/profile/userCard/Avatar";
import Card from "@/components/pages/user/profile/userCard/Card";
import Modal from "@/components/ui/modal/Modal";
import { loadImage } from "@/shared/utils/common";

import { updateUserCard } from "../services";

type CardPageType = {
  profile: KqsProfile;
  standCharacters: (Pick<KqsStandCharacters, "id" | "background" | "name"> & {
    images: Pick<KqsStandCharactersPhoto, "id" | "default"> | null;
  })[];
};

const CardPage = ({ profile, standCharacters }: CardPageType) => {
  const [user, setUser] = useState(profile);
  const [selectedStandCharacterId, setSelectedStandCharacterId] = useState<null | string>(null);

  const handleChangeCard = (characterId: string) => async () => {
    const character = standCharacters.find(({ id }) => id === characterId)!;

    try {
      await loadImage(character.background);

      setUser((prev) => ({
        ...prev,
        avatar: character.images?.default!,
        background: character.background,
      }));
      setSelectedStandCharacterId(characterId);
    } catch (error) {}
  };

  const handleSaveChanges = async () => {
    if (
      (profile.avatar === user.avatar && profile.background === user.background) ||
      !selectedStandCharacterId
    ) {
      return;
    }

    try {
      await updateUserCard(selectedStandCharacterId);
    } catch (error) {
      // To-do show error message
    }
  };

  return (
    <Modal>
      <ModalContent handleSaveChanges={handleSaveChanges} title="Оновити аватар">
        <div className="mt-5 flex gap-4 min-h-60">
          <Card profile={user} avatarComponent={<Avatar photo={user.avatar} name={user.name} />} />
          <ul className="flex flex-wrap gap-3 mt-5 justify-center max-h-[350px] overflow-y-auto py-3">
            {standCharacters.map((character) => (
              <li key={character.id}>
                <Avatar name={character.name} photo={character.images?.default!}>
                  <button type="button" onClick={handleChangeCard(character.id)} />
                </Avatar>
              </li>
            ))}
          </ul>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default CardPage;
