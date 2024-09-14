import { KqsCharacter, KqsIdentity, KqsStandCharacters } from "@prisma/client";

import prisma from "@/shared/db.server";

export const getCharactersCard = () =>
  prisma.kqsResource.findMany({
    select: {
      id: true,
      link: true,
      name: true,
      photo: true,
      characters: {
        select: {
          id: true,
          slug: true,
          previewName: true,
          previewPhoto: true,
        },
      },
    },
  });

export const getCharacterMetadata = (slug: string) =>
  prisma.kqsCharacter.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
    },
  });

export const getCharacter = (slug: string) =>
  prisma.kqsCharacter.findUnique({
    where: {
      slug,
    },
    select: {
      name: true,
      description: true,
      photo: true,
    },
  });

export const getCharacterPhotogalleryPhotos = (slug: string) =>
  prisma.kqsCharacterPhoto.findMany({
    where: {
      character: {
        slug,
      },
    },
    select: {
      id: true,
      small: true,
    },
  });

export const getUserFavoritesCharacterPhotosByIdentityId = (
  identityId: KqsIdentity["identityId"],
  slug: KqsCharacter["slug"]
) =>
  prisma.kqsCharacterPhoto.findMany({
    where: {
      character: {
        slug,
      },
      users: {
        some: {
          identity: {
            identityId,
          },
        },
      },
    },
    select: {
      id: true,
    },
  });

export const getCharacterVideos = (slug: string) =>
  prisma.kqsCharacter.findUnique({
    where: {
      slug,
    },
    select: {
      videos: {
        select: {
          id: true,
          path: true,
        },
      },
    },
  });

export const getStandCharacters = () =>
  prisma.kqsStandCharacters.findMany({
    select: {
      id: true,
      images: {
        select: {
          id: true,
          default: true,
        },
      },
      name: true,
      background: true,
    },
  });

export const getStandCharacterById = (id: KqsStandCharacters["id"]) =>
  prisma.kqsStandCharacters.findUnique({
    where: {
      id,
    },
    include: {
      images: true,
    },
  });
