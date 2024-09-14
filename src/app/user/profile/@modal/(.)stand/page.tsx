import { Metadata } from "next";
import invariant from "tiny-invariant";

import StandPage from "@/components/pages/user/profile/userStand/StandPage";
import { getAuthUser } from "@/services/clerk.service";
import {
  getStandData,
  getUserProfileByIdentityId,
  getUserStandDataByIdentityId,
} from "@/services/profile.service";
import prisma from "@/shared/db.server";

export const metadata: Metadata = {
  title: "Keqing | Profile | Stand",
};

export default async function Route() {
  const user = await getAuthUser();

  const [charactersData, standData] = await prisma.$transaction([
    getStandData(),
    getUserStandDataByIdentityId(user.id),
    getUserProfileByIdentityId(user.id),
  ]);

  invariant(standData, "User doesn't have a stand");

  return <StandPage charactersData={charactersData} standData={standData.stand} />;
}
