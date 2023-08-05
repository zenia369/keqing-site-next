export const enum NavNames {
  Characters = "Characters",
  About = "About",
  SendMessage = "Send message",
  Profile = "Profile",
}

export const enum NavLinks {
  Characters = "/characters",
  About = "/about-me",
  SendMessage = "/send-message",
  Profile = "/user/profile",
  KeqingPage = "/characters/keqing",
}

export const navList: { link: NavLinks; name: NavNames }[] = [
  {
    link: NavLinks.Characters,
    name: NavNames.Characters,
  },
  {
    link: NavLinks.About,
    name: NavNames.About,
  },
  {
    link: NavLinks.SendMessage,
    name: NavNames.SendMessage,
  },
  {
    link: NavLinks.Profile,
    name: NavNames.Profile,
  },
];

export type ListNames = (keyof typeof NavNames)[];
