import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";

import { getAuthUser } from "@/services/clerk.service";
import { createUserProfileRecord } from "@/services/user.service";
import { isElement } from "@/shared/utils/types";

export type RequestUserCreate = {
  intent: "create:user";
  username: string;
  city: string;
  element: string;
};

type RouteRequestTypes = RequestUserCreate;

export async function POST(req: NextRequest) {
  const data: RouteRequestTypes = await req.json();

  switch (data?.intent) {
    case "create:user":
      return createUser(data);

    default:
      return NextResponse.json({ message: "Unhandled intent" }, { status: 404 });
  }
}

async function createUser({ username, city, element }: RequestUserCreate) {
  try {
    const user = await getAuthUser();

    invariant(isElement(element), "Invalid element value");

    await createUserProfileRecord(user.id, {
      city,
      element,
      username,
    });

    return NextResponse.json(
      { message: "User created" },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error while creating user" },
      {
        status: 500,
      }
    );
  }
}
