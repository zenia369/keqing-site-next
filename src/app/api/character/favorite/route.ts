import { KqsCharacter } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";

import { getAuthUser } from "@/services/clerk.service";
import {
  addCharacterFavoriteByIdentityId,
  removeCharacterFavoriteByIdentityId,
} from "@/services/profile.service";

export type RequestAddFavorite = {
  intent: "update:user:favorite:add";
  characterId: KqsCharacter["id"];
};

export type RequestRemoveFavorite = {
  intent: "update:user:favorite:remove";
  characterId: KqsCharacter["id"];
};

type RouteRequestTypes = RequestRemoveFavorite | RequestAddFavorite;

export async function PATCH(req: NextRequest) {
  const data: RouteRequestTypes = await req.json();

  switch (data?.intent) {
    case "update:user:favorite:add":
      return addFavorite(data);
    case "update:user:favorite:remove":
      return removeFavorite(data);

    default:
      return NextResponse.json({ message: "Unhandled intent" }, { status: 404 });
  }
}

async function addFavorite({ characterId }: RequestAddFavorite) {
  try {
    invariant(characterId, "characterId ID is not defined");

    const user = await getAuthUser();

    await addCharacterFavoriteByIdentityId(user.id, characterId);

    return NextResponse.json({
      message: "User added new character photo to favorites",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while updating user favorites character photo",
      },
      {
        status: 500,
      }
    );
  }
}

async function removeFavorite({ characterId }: RequestRemoveFavorite) {
  try {
    invariant(characterId, "characterId ID is not defined");

    const user = await getAuthUser();

    await removeCharacterFavoriteByIdentityId(user.id, characterId);

    return NextResponse.json({
      message: "User removed character photo from favorites",
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error while removing user character photo from favorites",
      },
      {
        status: 500,
      }
    );
  }
}
