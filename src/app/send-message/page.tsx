import { Metadata } from "next";

import Page from "@/components/ui/page/Page";
import Navigation from "@/components/ui/navigation/Navigation";
import Main from "@/components/ui/main/Main";
import Footer from "@/components/ui/footer/Footer";
import SendFrom from "@/components/pages/send-message/SendFrom";
import FromReaction from "@/components/pages/send-message/FromReaction";

import FormReactionProvider from "@/components/pages/send-message/context/FormReaction.context";

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
          <FormReactionProvider>
            <SendFrom />
            <FromReaction />
          </FormReactionProvider>
        </Main>
      </Page>
      <Footer showLink={false} />
    </>
  );
}
