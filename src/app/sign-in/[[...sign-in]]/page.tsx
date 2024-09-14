import { SignIn } from "@clerk/nextjs";

import Main from "@/components/ui/main/Main";
import Page from "@/components/ui/page/Page";

export default function Route() {
  return (
    <Page>
      <Main classes="flex justify-center items-center">
        <SignIn />
      </Main>
    </Page>
  );
}
