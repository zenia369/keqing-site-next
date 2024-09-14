import Link from "next/link";
import { FC } from "react";
import { BsEnvelope } from "react-icons/bs";
import { MdOutlinedFlag } from "react-icons/md";

import { AppLinks, NavNames } from "@/shared/appLinks";
import { cn } from "@/shared/utils/common";

interface FooterProps {
  showLink?: boolean;
}

const Footer: FC<FooterProps> = ({ showLink = true }) => {
  return (
    <footer className="bg-purple-400 text-white border-t-4 border-purple-500 px-5">
      <div
        className={cn("container xl m-auto flex items-center py-5", {
          "justify-between": showLink,
          "justify-center": !showLink,
        })}
      >
        <div className="flex justify-between items-center gap-2">
          <MdOutlinedFlag className="text-[20px]" />
          <p>По запитаням звертатись у формі рецензії.</p>
        </div>
        {showLink ? (
          <Link
            href={AppLinks.SendMessage}
            className="flex justify-between items-center gap-2 hover:underline"
          >
            <BsEnvelope /> {NavNames.SendMessage}
          </Link>
        ) : null}
      </div>
    </footer>
  );
};

export default Footer;
