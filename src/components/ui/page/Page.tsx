import { FC, ReactNode } from "react";

import { cn } from "@/shared/utils/common";

interface PageProps {
  children: ReactNode;
  classes?: string;
}

const Page: FC<PageProps> = ({ children, classes }) => {
  return (
    <div className={cn("container xl mx-auto p-5", classes ? { [classes]: Boolean(classes) } : {})}>
      {children}
    </div>
  );
};

export default Page;
