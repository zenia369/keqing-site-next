import { Metadata } from "next";
import invariant from "tiny-invariant";

import CardPage from "@/components/pages/user/profile/userCard/CardPage";
import { getStandCharacters } from "@/services/characters.service";
import { getAuthUser } from "@/services/clerk.service";
import { getUserProfileByIdentityId } from "@/services/profile.service";
import prisma from "@/shared/db.server";

export const metadata: Metadata = {
  title: "Keqing | Profile | Card",
};

export default async function Route() {
  const user = await getAuthUser();

  const [profile, standCharacters] = await prisma.$transaction([
    getUserProfileByIdentityId(user.id),
    getStandCharacters(),
  ]);

  invariant(profile, "User don't have profile");

  return <CardPage profile={profile} standCharacters={standCharacters} />;
}
