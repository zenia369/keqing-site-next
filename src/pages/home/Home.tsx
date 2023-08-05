import { FC } from "react";

import PageLayout from "@/components/layouts/PageLayout";
import Main from "@/components/main/Main";
import Header from "./components/Header";

const Home: FC = () => {
  return (
    <PageLayout>
      <Header />
      <Main>www</Main>
    </PageLayout>
  );
};

export default Home;
