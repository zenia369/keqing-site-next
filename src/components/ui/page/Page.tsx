import { FC, ReactNode } from "react";

interface PageProps {
  children: ReactNode;
  classes?: string;
}

const Page: FC<PageProps> = ({ children, classes }) => {
  return (
    <div className={`container xl m-auto py-5 ${classes}`}>{children}</div>
  );
};

export default Page;
