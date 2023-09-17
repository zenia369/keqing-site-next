import { FC } from "react";

import PageLayout from "@/components/layouts/PageLayout";
import Main from "@/components/ui/main/Main";
import Header from "./components/Header";
import Info from "./components/info/Info";
import PicturesPreview from "./components/PicturesPreview";

const Home: FC = () => {
  return (
    <PageLayout>
      <Header />
      <Main>
        <Info />
        <PicturesPreview />
      </Main>
    </PageLayout>
  );
};

export default Home;
