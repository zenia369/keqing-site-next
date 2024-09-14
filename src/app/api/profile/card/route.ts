import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";

import { getStandCharacterById } from "@/services/characters.service";
import { getAuthUser } from "@/services/clerk.service";
import { updateUserProfileByIdentityId } from "@/services/profile.service";
import { logger } from "@/shared/utils/logger.server";
import { isElement } from "@/shared/utils/types";

export type RequestUpdateCard = {
  intent: "update:profile:card";
  standCharacterId: string;
};

export type RequestUpdateInfo = {
  intent: "update:profile:info";
  name: string;
  city: string;
  elemental: string;
};

type RouteRequestTypes = RequestUpdateCard | RequestUpdateInfo;

export async function PATCH(req: NextRequest) {
  const data: RouteRequestTypes = await req.json();

  switch (data?.intent) {
    case "update:profile:card":
      return updateProfileCard(data);
    case "update:profile:info":
      return updateProfileInfo(data);

    default:
      return NextResponse.json({ message: "Unhandled intent" }, { status: 404 });
  }
}

async function updateProfileInfo({ city, elemental, name }: RequestUpdateInfo) {
  try {
    const user = await getAuthUser();

    invariant(isElement(elemental), "Elemental not exsit");

    await updateUserProfileByIdentityId(user.id, {
      name,
      city,
      element: elemental,
    });

    return new Response(JSON.stringify({ message: "Profile info updated" }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      logger.info("#api/profile/card", "update:profile:info", error.message);
    }

    return new Response(JSON.stringify({ message: "Error while updating profile info" }), {
      status: 500,
    });
  }
}

async function updateProfileCard({ standCharacterId }: RequestUpdateCard) {
  try {
    invariant(standCharacterId, "Stand character ID is not defined");

    const user = await getAuthUser();

    const standCharacter = await getStandCharacterById(standCharacterId);

    invariant(standCharacter, "Profile or stand character not found");

    await updateUserProfileByIdentityId(user.id, {
      avatar: standCharacter.images?.default!,
      background: standCharacter.background,
    });

    return new Response(JSON.stringify({ message: "User card updated" }), { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      logger.info("#api/profile/card", "update:profile:card", error.message);
    }

    return new Response(JSON.stringify({ message: "Error while updating profile card" }), {
      status: 500,
    });
  }
}
