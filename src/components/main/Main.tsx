import { FC, ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return <main className="my-8 flex flex-col gap-12">{children}</main>;
};

export default Main;
