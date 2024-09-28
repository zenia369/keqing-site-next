import { NextRequest, NextResponse } from "next/server";
import invariant from "tiny-invariant";

import { getAuthUser } from "@/services/clerk.service";
import {
  createConnectionRedirectState,
  saveConnectionIdByIdentityId,
} from "@/services/uPamersConnection.service";
import { AppLinks } from "@/shared/appLinks";
import { apiLogger } from "@/shared/utils/logger.server";

export type RequestConnectionPrepareUPamers = {
  intent: "connection:prepare:upamers";
};

type RoutePOSTRequestTypes = RequestConnectionPrepareUPamers;

export async function POST(req: NextRequest) {
  const data: RoutePOSTRequestTypes = await req.json();

  switch (data?.intent) {
    case "connection:prepare:upamers":
      return connectionPrepareUPamers();

    default:
      return NextResponse.json({ message: "Unhandled intent" }, { status: 404 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getAuthUser();
    const reqUrl = new URL(req.url);
    const searchParams = reqUrl.searchParams;

    const connectionId = searchParams.get("connectionId");

    invariant(connectionId, "ConnectionId should be provided");

    await saveConnectionIdByIdentityId(user.id, connectionId);

    return NextResponse.redirect(`${reqUrl.origin}${AppLinks.Profile}`);
  } catch (error) {
    if (error instanceof Error) {
      apiLogger.error(`Failed to add connection, error=${error.message}`, error);
    }
    return NextResponse.json({ message: "Failed to add connection", error }, { status: 500 });
  }
}

async function connectionPrepareUPamers() {
  try {
    const user = await getAuthUser();
    const redirectState = await createConnectionRedirectState(user.id);

    return NextResponse.json({ url: redirectState });
  } catch (error) {
    if (error instanceof Error) {
      apiLogger.error(`Failed to create redirect state, error=${error.message}`, error);
    }
    return NextResponse.json({ message: "Failed to create redirect state" }, { status: 500 });
  }
}
