import { FC, ReactNode } from "react";
import Navigation from "../navigation/Navigation";
import Footer from "../footer/Footer";

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <div className="container xl m-auto py-5">
        <Navigation />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
