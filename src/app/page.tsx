import { Metadata } from "next";

import Header from "@/components/pages/home/Header";
import Info from "@/components/pages/home/Info";
import PicturesPreview from "@/components/pages/home/PicturesPreview";
import Footer from "@/components/ui/footer/Footer";
import Main from "@/components/ui/main/Main";
import Navigation from "@/components/ui/navigation/Navigation";
import Page from "@/components/ui/page/Page";

export const metadata: Metadata = {
  title: "Keqing | Kushnir",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

export default function Route() {
  return (
    <>
      <Page>
        <Navigation />
        <Header />
        <Main>
          <Info />
          <PicturesPreview />
        </Main>
      </Page>
      <Footer />
    </>
  );
}
