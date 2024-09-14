import { KqsCharacter, KqsIdentity, KqsProfile, KqsStandCharacters } from "@prisma/client";

import prisma from "@/shared/db.server";

import { getUserIdByIdentityId } from "./user.service";

export const getUserProfileDataByIdentityId = (identityId: KqsIdentity["identityId"]) =>
  prisma.kqsUser.findFirst({
    where: {
      identity: {
        identityId,
      },
    },
    select: {
      favorites: {
        select: {
          id: true,
          small: true,
        },
      },
      profile: true,
      stand: {
        select: {
          element: true,
          id: true,
          name: true,
          images: {
            select: {
              small: true,
            },
          },
        },
      },
    },
  });

export const getStandData = () =>
  prisma.kqsStandCharacters.findMany({
    select: {
      id: true,
      name: true,
      element: true,
      images: {
        select: {
          small: true,
        },
      },
    },
  });

export const getUserStandDataByIdentityId = (identityId: KqsIdentity["identityId"]) =>
  prisma.kqsUser.findFirst({
    where: {
      identity: {
        identityId,
      },
    },
    select: {
      stand: {
        select: {
          id: true,
          name: true,
          element: true,
          images: {
            select: {
              small: true,
            },
          },
        },
      },
    },
  });

export const getUserProfileByIdentityId = (identityId: KqsIdentity["identityId"]) =>
  prisma.kqsProfile.findFirst({
    where: {
      user: {
        identity: {
          identityId,
        },
      },
    },
  });

export const updateUserProfileByIdentityId = async (
  identityId: KqsIdentity["identityId"],
  data: Partial<Omit<KqsProfile, "id">>
) => {
  const userId = await getUserIdByIdentityId(identityId);

  return prisma.kqsProfile.update({
    where: {
      userId,
    },
    data,
  });
};

export const updateUserStandByIdentityId = async (
  identityId: KqsIdentity["identityId"],
  removeStandCharactersIds: KqsStandCharacters["id"][],
  addStandCharactersIds: KqsStandCharacters["id"][]
) => {
  const userId = await getUserIdByIdentityId(identityId);

  return prisma.kqsUser.update({
    where: {
      id: userId,
    },
    data: {
      stand: {
        disconnect: removeStandCharactersIds.map((id) => ({ id })),
        connect: addStandCharactersIds.map((id) => ({ id })),
      },
    },
  });
};

export const addCharacterFavoriteByIdentityId = async (
  identityId: KqsIdentity["identityId"],
  characterId: KqsCharacter["id"]
) => {
  const userId = await getUserIdByIdentityId(identityId);

  return prisma.kqsUser.update({
    where: {
      id: userId,
    },
    data: {
      favorites: {
        connect: {
          id: characterId,
        },
      },
    },
  });
};

export const removeCharacterFavoriteByIdentityId = async (
  identityId: KqsIdentity["identityId"],
  characterId: KqsCharacter["id"]
) => {
  const userId = await getUserIdByIdentityId(identityId);

  return prisma.kqsUser.update({
    where: {
      id: userId,
    },
    data: {
      favorites: {
        disconnect: {
          id: characterId,
        },
      },
    },
  });
};
