import { Metadata } from "next";
import Characters from "@/pages/characters/Characters";

export const metadata: Metadata = {
  title: "Keqing | Characters",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

export default function Page() {
  return <Characters />;
}
