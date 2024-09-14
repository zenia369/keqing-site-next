import { FC, ReactNode } from "react";

import Footer from "../ui/footer/Footer";
import Navigation from "../ui/navigation/Navigation";
import Page from "../ui/page/Page";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Page>
        <Navigation />
        {children}
      </Page>
      <Footer />
    </>
  );
};

export default PageLayout;
