import Link from "next/link";
import { FC } from "react";

import { NavLinks } from "@/shared/appLinks";
import NavListItem from "./components/NavListItem";

interface NavigtionProps {
  pageName?: string;
  isShowSendMessageLink?: boolean;
}

const Navigation: FC<NavigtionProps> = ({
  pageName,
  isShowSendMessageLink,
}) => {
  return (
    <nav className="h-16 px-8 py-2 border-2 rounded-2xl border-gray-300 flex justify-between items-center">
      <Link
        href="/"
        className="text-3xl font-semibold kq-text kq-text-underline"
      >
        Home page{pageName ? `:/${pageName}` : ""}
      </Link>
      <ul className="flex justify-between items-center gap-6">
        <NavListItem
          tooltipText="Characters"
          href={NavLinks.Characters}
          text="Characters"
        />
        <NavListItem tooltipText="About" href={NavLinks.About} text="About" />
        {isShowSendMessageLink && (
          <NavListItem
            tooltipText="Send message"
            href={NavLinks.SendMessage}
            text="Send message"
          />
        )}
        <NavListItem
          tooltipText="Profile"
          href={NavLinks.Profile}
          text="Profile"
        />
      </ul>
    </nav>
  );
};

export default Navigation;
