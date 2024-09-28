import { KqsIdentity, KqsUPamersConnection } from "@prisma/client";
import invariant from "tiny-invariant";

import prisma from "@/shared/db.server";

import { getUserProfileByIdentityId } from "./profile.service";
import { getUserIdByIdentityId } from "./user.service";

invariant(
  process?.env?.UPAMERS_CHAT_CONNECTION_CREATE_URL,
  "UPAMERS_CHAT_CONNECTION_CREATE_URL env should be provided"
);
invariant(
  process?.env?.UPAMERS_CHAT_CONNECTION_USER_DATA_URL,
  "UPAMERS_CHAT_CONNECTION_USER_DATA_URL env should be provided"
);
invariant(process?.env?.UPAMERS_CHAT_URL, "UPAMERS_CHAT_URL env should be provided");
invariant(
  process?.env?.SELF_CONNECTION_REDIRECT_URL,
  "SELF_CONNECTION_REDIRECT_URL env should be provided"
);
invariant(process?.env?.SELF_NAME, "SELF_NAME env should be provided");
invariant(process?.env?.SELF_URL, "SELF_URL env should be provided");

export const getHasUserUPamersConnectionByIdentityId = async (
  identityId: KqsIdentity["identityId"]
): Promise<boolean> => {
  const connection = await prisma.kqsUPamersConnection.findFirst({
    where: {
      user: {
        identity: {
          identityId,
        },
      },
    },
  });

  return Boolean(connection?.connectionId);
};

export const createConnectionRedirectState = async (
  identityId: KqsIdentity["identityId"]
): Promise<string> => {
  const userId = await getUserIdByIdentityId(identityId);
  const hasUserConnection = await getHasUserUPamersConnectionByIdentityId(identityId);

  if (hasUserConnection) {
    await prisma.kqsUPamersConnection.delete({
      where: {
        userId: userId!,
      },
    });
  }

  const [profile, connection] = await prisma.$transaction([
    getUserProfileByIdentityId(identityId),
    prisma.kqsUPamersConnection.create({
      data: {
        userId: userId!,
      },
      select: {
        id: true,
      },
    }),
  ]);

  invariant(userId, "User not found");
  invariant(profile, "User profile not found");
  invariant(connection?.id, "User self connection id not found");

  const connectionUrl = `${process.env?.UPAMERS_CHAT_URL}${process.env?.UPAMERS_CHAT_CONNECTION_CREATE_URL}`;
  const selfRedirectUrl = `${process.env?.SELF_URL}${process.env?.SELF_CONNECTION_REDIRECT_URL}`;

  const searchParams = new URLSearchParams();
  searchParams.append("userId", userId);
  searchParams.append("userName", profile.name);
  searchParams.append("selfName", process.env?.SELF_NAME!);
  searchParams.append("selfRedirectUrl", selfRedirectUrl);
  searchParams.append("selfConnectionId", connection.id);

  const redirectUrl = `${connectionUrl}?${searchParams.toString()}`;

  return redirectUrl;
};

export const saveConnectionIdByIdentityId = async (
  identityId: KqsIdentity["identityId"],
  connectionId: KqsUPamersConnection["connectionId"]
) => {
  const userId = await getUserIdByIdentityId(identityId);

  return prisma.kqsUPamersConnection.update({
    where: {
      userId: userId!,
    },
    data: {
      connectionId: connectionId!,
    },
  });
};

export const getConnectionUserDataUrl = async (identityId: KqsIdentity["identityId"]) => {
  const connection = await prisma.kqsUPamersConnection.findFirst({
    where: {
      user: {
        identity: {
          identityId,
        },
      },
    },
  });

  if (!connection) return undefined;

  const connectionUrl = `${process.env?.UPAMERS_CHAT_URL}${process.env?.UPAMERS_CHAT_CONNECTION_USER_DATA_URL}`;

  const searchParams = new URLSearchParams();
  searchParams.append("selfConnectionId", connection.connectionId!);
  searchParams.append("connectionId", connection.id);

  return `${connectionUrl}?${searchParams.toString()}`;
};
