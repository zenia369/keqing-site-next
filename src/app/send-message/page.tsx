import { Metadata } from "next";
import { Suspense } from "react";

import FormReactionProvider from "@/components/pages/send-message/context/FormReaction.context";
import FromReaction from "@/components/pages/send-message/FromReaction";
import SendFrom from "@/components/pages/send-message/SendFrom";
import Footer from "@/components/ui/footer/Footer";
import Main from "@/components/ui/main/Main";
import Navigation from "@/components/ui/navigation/Navigation";
import Page from "@/components/ui/page/Page";

export const metadata: Metadata = {
  title: "Keqing | SendMessage",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

export default function Route() {
  return (
    <>
      <Page classes="min-h-[100vh]">
        <Navigation pageName="Send Message" />
        <Main>
          <Suspense fallback="Loading...">
            <FormReactionProvider>
              <SendFrom />
              <FromReaction />
            </FormReactionProvider>
          </Suspense>
        </Main>
      </Page>
      <Footer showLink={false} />
    </>
  );
}
