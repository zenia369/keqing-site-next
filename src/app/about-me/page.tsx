import { Metadata } from "next";
import AboutMe from "@/pages/about-me/AboutMe";

export const metadata: Metadata = {
  title: "Keqing | AboutMe",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

export default function Page() {
  return <AboutMe />;
}
