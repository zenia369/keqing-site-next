import Link from "next/link";
import { FC } from "react";

import { AppLinks, NavNames } from "@/shared/appLinks";

import NavListItem from "./components/NavListItem";

interface NavigtionProps {
  pageName?: string;
  isShowSendMessageLink?: boolean;
  isShowAboutPage?: boolean;
}

const Navigation: FC<NavigtionProps> = ({ pageName, isShowSendMessageLink, isShowAboutPage }) => {
  return (
    <nav className="h-16 px-8 py-2 border-2 rounded-2xl border-gray-300 flex justify-between items-center">
      <Link href="/" className="text-3xl font-semibold kq-text kq-text-underline">
        {NavNames.Home}
        {pageName ? `:/${pageName}` : ""}
      </Link>
      <ul className="flex justify-between items-center gap-6">
        <NavListItem
          tooltipText="Знайди свого персонажа"
          href={AppLinks.Characters}
          text={NavNames.Characters}
        />
        {isShowSendMessageLink ? (
          <NavListItem
            tooltipText="Зв'язок з автором"
            href={AppLinks.SendMessage}
            text={NavNames.SendMessage}
          />
        ) : (
          <NavListItem
            tooltipText="Інформація про сайт"
            href={AppLinks.About}
            text={NavNames.About}
          />
        )}
        {isShowAboutPage ? (
          <NavListItem
            tooltipText="Інформація про сайт"
            href={AppLinks.About}
            text={NavNames.About}
          />
        ) : (
          <NavListItem
            tooltipText="Створи свій профіль"
            href={AppLinks.Profile}
            text={NavNames.Profile}
          />
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
