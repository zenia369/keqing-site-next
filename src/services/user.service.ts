import { KqsElementalTypes, KqsIdentity, KqsStandCharacters } from "@prisma/client";
import invariant from "tiny-invariant";

import prisma from "@/shared/db.server";

import { getUserEmailAddressByEmailId } from "./clerk.service";

export const createRandomUserStandCharacter = async (): Promise<KqsStandCharacters[]> => {
  const standCharactersData = await prisma.kqsStandCharacters.findMany();
  const userStandCharacters: KqsStandCharacters[] = [];

  while (userStandCharacters.length !== 8) {
    const randomStandCharacter =
      standCharactersData[Math.floor(Math.random() * standCharactersData.length)];

    if (!userStandCharacters.find(({ id }) => id === randomStandCharacter.id)) {
      userStandCharacters.push(randomStandCharacter);
    }
  }

  if (userStandCharacters.length > 8) return createRandomUserStandCharacter();

  return userStandCharacters;
};

const createRandomUserCard = async (): Promise<{
  avatar: string;
  background: string;
}> => {
  const standCharactersIds = await prisma.kqsStandCharacters.findMany({
    select: {
      id: true,
    },
  });

  const countStandCharacters = standCharactersIds.length;

  const randomStandCharacter = standCharactersIds[Math.floor(Math.random() * countStandCharacters)];

  const standCharacter = await prisma.kqsStandCharacters.findUnique({
    where: {
      id: randomStandCharacter.id,
    },
    select: {
      background: true,
      images: {
        select: {
          default: true,
        },
      },
    },
  });

  if (!standCharacter) return createRandomUserCard();

  return {
    avatar: standCharacter.images?.default!,
    background: standCharacter.background,
  };
};

export const getIsUserCreatedByIdentityId = async (identityId: KqsIdentity["identityId"]) => {
  const identityData = await prisma.kqsIdentity.findUnique({
    where: {
      identityId,
    },
    select: {
      user: {
        select: {
          isUserCreated: true,
        },
      },
    },
  });

  return identityData ? identityData.user.isUserCreated : false;
};

export const getIsUserFinishCreatingProfileByIdentityId = async (
  identityId: KqsIdentity["identityId"]
) => {
  const identityData = await prisma.kqsIdentity.findUnique({
    where: {
      identityId,
    },
    select: {
      user: {
        select: {
          isUserFinishCreatingProfile: true,
        },
      },
    },
  });

  return identityData ? identityData.user.isUserFinishCreatingProfile : false;
};

export const createUserRecordWithoutProfile = async ({
  emailId,
  identityId,
}: {
  identityId: string;
  emailId: string;
}) => {
  const userStandCharacters = await createRandomUserStandCharacter();
  const userEmail = await getUserEmailAddressByEmailId(emailId);

  await prisma.kqsUser.create({
    data: {
      identity: {
        create: {
          email: userEmail.emailAddress,
          identityId,
        },
      },
      stand: {
        connect: userStandCharacters.map(({ id }) => ({ id })),
      },
      favorites: {},
    },
  });
};

export const getUserIdByIdentityId = async (
  identityId: KqsIdentity["identityId"]
): Promise<string | undefined> => {
  const user = await prisma.kqsUser.findFirst({
    where: {
      identity: {
        identityId,
      },
    },
    select: {
      id: true,
    },
  });

  return user?.id;
};

export const createUserProfileRecord = async (
  identityId: KqsIdentity["identityId"],
  profileData: {
    username: string;
    city: string;
    element: KqsElementalTypes;
  }
) => {
  const userId = await getUserIdByIdentityId(identityId);

  invariant(userId, "User should be created");

  const userCardData = await createRandomUserCard();

  return prisma.kqsUser.update({
    where: {
      id: userId,
    },
    data: {
      isUserFinishCreatingProfile: true,
      profile: {
        create: {
          name: profileData.username,
          city: profileData.city,
          element: profileData.element,
          avatar: userCardData.avatar,
          background: userCardData.background,
        },
      },
    },
  });
};
