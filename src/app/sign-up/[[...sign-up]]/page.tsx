import { SignUp } from "@clerk/nextjs";

import Main from "@/components/ui/main/Main";
import Page from "@/components/ui/page/Page";
import { AppLinks } from "@/shared/appLinks";

export default function Route() {
  return (
    <Page>
      <Main classes="flex justify-center items-center">
        <SignUp forceRedirectUrl={AppLinks.CreateProfile} />
      </Main>
    </Page>
  );
}
