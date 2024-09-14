import { FC, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
  classes?: string;
}

const Main: FC<MainProps> = ({ children, classes = "" }) => {
  return <main className={`my-8 flex flex-col gap-12 ${classes}`}>{children}</main>;
};

export default Main;
