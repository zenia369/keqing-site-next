import { FC } from "react";

import Main from "@/components/ui/main/Main";
import Navigation from "@/components/ui/navigation/Navigation";
import Page from "@/components/ui/page/Page";
import Footer from "@/components/ui/footer/Footer";
import Overlay from "./components/Overlay";

const AboutMe: FC = () => {
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
};

export default AboutMe;
