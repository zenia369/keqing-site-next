import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import invariant from "tiny-invariant";

import FavoritesPhoto from "@/components/pages/user/profile/FavoritesPhoto";
import UserCard from "@/components/pages/user/profile/userCard/UserCard";
import UserStand from "@/components/pages/user/profile/userStand/UserStand";
import Footer from "@/components/ui/footer/Footer";
import Main from "@/components/ui/main/Main";
import Navigation from "@/components/ui/navigation/Navigation";
import Page from "@/components/ui/page/Page";
import { getProfileBackground } from "@/services/background.local.service";
import { getUserProfileDataByIdentityId } from "@/services/profile.service";

export const metadata: Metadata = {
  title: "Keqing | Profile",
};

/**
 *
 *background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url('https://images.freeimages.com/images/large-previews/48d/woodgrain-texture-1151631.jpg')
 */

export default async function Route() {
  const [user, profileBackground] = await Promise.all([currentUser(), getProfileBackground()]);

  invariant(user, "User is not sign in");

  const data = await getUserProfileDataByIdentityId(user.id);

  invariant(data, "User not found");

  const { profile, favorites, stand } = data;

  invariant(profile, "User must have a profile");

  return (
    <div
      style={{
        backgroundSize: "100% 100%",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        background: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.15)), url("${profileBackground}")`,
      }}
    >
      <Page classes="min-h-[100vh]">
        <Navigation pageName="Profile" isShowSendMessageLink isShowAboutPage />
        <Main>
          <section>
            <div className="ml-auto w-fit p-2 border border-purple-300 text-purple-200 rounded hover:bg-purple-300 hover:text-white">
              <SignOutButton>Log out</SignOutButton>
            </div>
          </section>
          <section className="flex justify-evenly gap-20">
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
