import Link from "next/link";
import { FC } from "react";
import { MdOutlinedFlag } from "react-icons/md";

import { NavLinks, NavNames } from "@/shared/appLinks";

interface FooterProps {
  showLink?: boolean;
}

const Footer: FC<FooterProps> = ({ showLink = true }) => {
  return (
    <footer>
      <div>
        <MdOutlinedFlag />
        <p>По запитаням звертатись у формі рецензії.</p>
      </div>
      {showLink && (
        <Link href={NavLinks.SendMessage}>{NavNames.SendMessage}</Link>
      )}
    </footer>
  );
};

export default Footer;
