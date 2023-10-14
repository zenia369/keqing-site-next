import Link from "next/link";
import { FC } from "react";

import { AppLinks } from "@/shared/appLinks";
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
          href={AppLinks.Characters}
          text="Characters"
        />
        {isShowSendMessageLink ? (
          <NavListItem
            tooltipText="Send message"
            href={AppLinks.SendMessage}
            text="Send message"
          />
        ) : (
          <NavListItem tooltipText="About" href={AppLinks.About} text="About" />
        )}
        <NavListItem
          tooltipText="Profile"
          href={AppLinks.Profile}
          text="Profile"
        />
      </ul>
    </nav>
  );
};

export default Navigation;
