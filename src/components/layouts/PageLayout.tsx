import { FC, ReactNode } from "react";
import Page from "../ui/page/Page";
import Navigation from "../ui/navigation/Navigation";
import Footer from "../ui/footer/Footer";

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
