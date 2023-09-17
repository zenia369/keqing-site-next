export const enum NavNames {
  Characters = "Characters",
  About = "About",
  SendMessage = "Send message",
  Profile = "Profile",
  Home = "Home",
}

export const enum AppLinks {
  Characters = "/characters",
  About = "/about-me",
  SendMessage = "/send-message",
  Profile = "/user/profile",
  KeqingPage = "/characters/keqing",
  Pictures = "/pictures",
  Home = "/",
}

export type ListNames = (keyof typeof NavNames)[];

export const appNavList: { link: AppLinks; name: NavNames }[] = [
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
