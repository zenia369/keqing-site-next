import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import invariant from "tiny-invariant";

import BackgroundButton from "@/components/pages/user/profile/BackgroundButton";
import FavoritesPhoto from "@/components/pages/user/profile/FavoritesPhoto";
import SignOutButton from "@/components/pages/user/profile/SignOutButton";
import UPamersConnectionButton from "@/components/pages/user/profile/UPamersConnection/UPamersConnectionButton";
import UPamersConnectionCard from "@/components/pages/user/profile/UPamersConnection/UPamersConnectionCard";
import UserCard from "@/components/pages/user/profile/userCard/UserCard";
import UserStand from "@/components/pages/user/profile/userStand/UserStand";
import Footer from "@/components/ui/footer/Footer";
import Main from "@/components/ui/main/Main";
import Navigation from "@/components/ui/navigation/Navigation";
import Page from "@/components/ui/page/Page";
import { getProfileBackground } from "@/services/background.local.service";
import { getUserProfileDataByIdentityId } from "@/services/profile.service";
import {
  getConnectionUserDataUrl,
  getHasUserUPamersConnectionByIdentityId,
} from "@/services/uPamersConnection.service";
import { cn } from "@/shared/utils/common";

export const metadata: Metadata = {
  title: "Keqing | Profile",
};

export default async function Route() {
  const [user, profileBackground] = await Promise.all([currentUser(), getProfileBackground()]);

  invariant(user, "User is not sign in");

  const [data, hasUserUPamersConnection, connectionUrl] = await Promise.all([
    getUserProfileDataByIdentityId(user.id),
    getHasUserUPamersConnectionByIdentityId(user.id),
    getConnectionUserDataUrl(user.id),
  ]);

  invariant(data, "User not found");

  const { profile, favorites, stand } = data;

  invariant(profile, "User must have a profile");

  return (
    <div
      style={{
        background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)), url("${profileBackground}")`,
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
      }}
    >
      <Page classes="min-h-[100vh]">
        <Navigation pageName="Profile" isShowSendMessageLink isShowAboutPage />
        <Main>
          <section
            className={cn("", {
              "flex justify-between gap-4": hasUserUPamersConnection,
            })}
          >
            {hasUserUPamersConnection ? <UPamersConnectionCard url={connectionUrl} /> : null}
            <div className="flex justify-end gap-4">
              {hasUserUPamersConnection ? null : <UPamersConnectionButton />}
              <BackgroundButton background={profileBackground} />
              <SignOutButton />
            </div>
          </section>
          <section className="flex justify-evenly gap-20 ">
            <UserCard profile={profile} />
            <UserStand stand={stand} />
          </section>
          <FavoritesPhoto photos={favorites} />
        </Main>
      </Page>
      <Footer showLink={false} />
    </div>
  );
}
