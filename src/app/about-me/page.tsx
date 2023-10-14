import { Metadata } from "next";

import Footer from "@/components/ui/footer/Footer";
import Main from "@/components/ui/main/Main";
import Page from "@/components/ui/page/Page";
import Navigation from "@/components/ui/navigation/Navigation";
import Overlay from "@/components/pages/about-me/Overlay";

export const metadata: Metadata = {
  title: "Keqing | AboutMe",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

export default function Route() {
  return (
    <Overlay>
      <Page classes="h-[100vh]">
        <Navigation pageName="About" isShowSendMessageLink />
        <Main>
          <div className="flex justify-center items-center gap-10 mt-[20%]">
            <div>
              <h2 className="underline text-4xl text-white font-bold">
                Kushnir Yevhenii
              </h2>
              <ul className="list-[circle] mt-5 ml-5 text-lg">
                <li className="text-white">Front-end Dev.</li>
              </ul>
            </div>
            <p className="text-white w-96 text-lg">
              Цей сайт є проектом автора. Також з часом буде покращуватись
              візуально та функціонально. © Kushnir
            </p>
          </div>
        </Main>
      </Page>
      <Footer showLink={false} />
    </Overlay>
  );
}
