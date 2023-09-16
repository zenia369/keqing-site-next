export const enum NavNames {
  Characters = "Characters",
  About = "About",
  SendMessage = "Send message",
  Profile = "Profile",
}

export const enum AppLinks {
  Characters = "/characters",
  About = "/about-me",
  SendMessage = "/send-message",
  Profile = "/user/profile",
  KeqingPage = "/characters/keqing",
  Pictures = "/pictures",
}

export const navList: { link: AppLinks; name: NavNames }[] = [
  {
    link: AppLinks.Characters,
    name: NavNames.Characters,
  },
  {
    link: AppLinks.About,
    name: NavNames.About,
  },
  {
    link: AppLinks.SendMessage,
    name: NavNames.SendMessage,
  },
  {
    link: AppLinks.Profile,
    name: NavNames.Profile,
  },
];

export type ListNames = (keyof typeof NavNames)[];
