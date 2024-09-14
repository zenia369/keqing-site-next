import { KqsStandCharacters } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";

import { getAuthUser } from "@/services/clerk.service";
import {
  getUserStandDataByIdentityId,
  updateUserStandByIdentityId,
} from "@/services/profile.service";

export type RequestUpdateStand = {
  intent: "update:profile:stand";
  standCharactersIds: KqsStandCharacters["id"][];
};

type RouteRequestTypes = RequestUpdateStand;

export async function PATCH(req: NextRequest) {
  const data: RouteRequestTypes = await req.json();

  switch (data?.intent) {
    case "update:profile:stand":
      return updateProfileStand(data);

    default:
      return NextResponse.json({ message: "Unhandled intent" }, { status: 404 });
  }
}

async function updateProfileStand({ standCharactersIds }: RequestUpdateStand) {
  try {
    const user = await getAuthUser();

    const userStand = await getUserStandDataByIdentityId(user.id);

    invariant(userStand, "User stand not found");

    const currentUserStand = userStand.stand.map(({ id }) => id);
    const newUserStand = standCharactersIds;

    const addCharactersIds = newUserStand.filter((id) => !currentUserStand.includes(id));
    const removeCharactersIds = currentUserStand.filter((id) => !newUserStand.includes(id));

    await updateUserStandByIdentityId(user.id, removeCharactersIds, addCharactersIds);

    return new Response(JSON.stringify({ message: "User stand updated" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Error while updating user stand" }), {
      status: 500,
    });
  }
}
