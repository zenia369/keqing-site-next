import { currentUser } from "@clerk/nextjs/server";
import { Metadata } from "next";
import { Suspense } from "react";
import invariant from "tiny-invariant";

import userCreateBg from "@/assets/images/user-create-bg.png";
import CreatePageForm from "@/components/pages/user/create/CreatePageForm";
import Main from "@/components/ui/main/Main";
import Overlay from "@/components/ui/overlay/Overlay";
import Page from "@/components/ui/page/Page";
import {
  createUserRecordWithoutProfile,
  getIsUserCreatedByIdentityId,
} from "@/services/user.service";

export const metadata: Metadata = {
  title: "Keqing | Profile | Create",
};

export default async function Route() {
  const user = await currentUser();

  invariant(user, "User not signed in");
  invariant(user.primaryEmailAddressId, "User should have email address");

  const isUserCreated = await getIsUserCreatedByIdentityId(user.id);

  if (!isUserCreated) {
    await createUserRecordWithoutProfile({
      identityId: user.id,
      emailId: user.primaryEmailAddressId,
    });
  }

  return (
    <Overlay backgroundUrl={userCreateBg.src}>
      <Page classes="h-[100vh]">
        <Main classes="h-[90%] backdrop-blur-sm rounded-2xl hover:scale-105 hover:backdrop-blur-md transition-all ease-in-out">
          <div className="flex justify-evenly gap-10 h-full">
            <div className="max-w-[400px]">
              <h2 className="text-4xl text-white font-bold mt-40">
                Welcome abort {user.username}!
              </h2>
              <p className="text-lg text-white mt-5">
                Заповніть форму для завершення створення профілю <br /> на{" "}
                <span className="text-purple-200 text-xl">Keqing-site</span>
              </p>
            </div>
            <div className="min-w-[360px]">
              <Suspense fallback="Loading">
                <CreatePageForm username={user.username} />
              </Suspense>
            </div>
          </div>
        </Main>
      </Page>
    </Overlay>
  );
}
