import Link from "next/link";
import { FC } from "react";
import { MdOutlinedFlag } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";

import { AppLinks, NavNames } from "@/shared/appLinks";

interface FooterProps {
  showLink?: boolean;
}

const Footer: FC<FooterProps> = ({ showLink = true }) => {
  return (
    <footer className="bg-purple-400 text-white border-t-4 border-purple-500">
      <div className="container xl m-auto flex justify-between items-center py-5">
        <div className="flex justify-between items-center gap-2">
          <MdOutlinedFlag className="text-[20px]" />
          <p>По запитаням звертатись у формі рецензії.</p>
        </div>
        {showLink && (
          <Link
            href={AppLinks.SendMessage}
            className="flex justify-between items-center gap-2 hover:underline"
          >
            <BsEnvelope /> {NavNames.SendMessage}
          </Link>
        )}
      </div>
    </footer>
  );
};

export default Footer;
