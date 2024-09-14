export const NavNames = {
  Characters: "Characters",
  About: "About",
  SendMessage: "Send message",
  Profile: "Profile",
  Home: "Home",
} as const;

export const AppLinks = {
  Characters: "/characters",
  About: "/about-me",
  SendMessage: "/send-message",
  Profile: "/user/profile",
  CreateProfile: "/user/create",
  KeqingPage: "/characters/keqing",
  Pictures: "/pictures",
  Home: "/",
  SignIn: "/sign-in",
  SignUp: "/sign-up",
} as const;

export const ApiLinks = {
  CreateProfile: "/api/user/create",
} as const;

export type ListNames = (keyof typeof NavNames)[];

export const appNavList: {
  link: (typeof AppLinks)[keyof typeof AppLinks];
  name: (typeof NavNames)[keyof typeof NavNames];
}[] = [
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
