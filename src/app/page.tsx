import { Metadata } from "next";

import Home from "@/pages/home/Home";

export const metadata: Metadata = {
  title: "Keqing | Kushnir",
  description:
    "Привіт, і це Keqing-site. Семпай може тут знайти багато цікавого контенту(фото, відео) по світу ігор, манг та щіпотку цікавого функціоналу.",
};

export default function Page() {
  return <Home />;
}
