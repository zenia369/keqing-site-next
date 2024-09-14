import "./Navigation.css";

import Link from "next/link";
import { FC } from "react";

import { AppLinks, NavNames } from "@/shared/appLinks";

const charactersNavList: {
  link: (typeof AppLinks)[keyof typeof AppLinks];
  name: (typeof NavNames)[keyof typeof NavNames];
}[] = [
  {
    name: NavNames.Home,
    link: AppLinks.Home,
  },
  {
    name: NavNames.About,
    link: AppLinks.About,
  },
  {
    name: NavNames.SendMessage,
    link: AppLinks.SendMessage,
  },
  {
    name: NavNames.Profile,
    link: AppLinks.Profile,
  },
];

const Navigation: FC = () => {
  return (
    <div className="menu">
      <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon" hidden />
      <label htmlFor="menu-icon"></label>
      <nav className="nav">
        <ul className="pt-5">
          {charactersNavList.map(({ link, name }, idx) => (
            <li key={`characters-nav-list-${idx}`}>
              <Link href={link}>{name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
