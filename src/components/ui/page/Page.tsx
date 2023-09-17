import { FC, ReactNode } from "react";

interface PageProps {
  children: ReactNode;
}

const Page: FC<PageProps> = ({ children }) => {
  return <div className="container xl m-auto py-5">{children}</div>;
};

export default Page;
