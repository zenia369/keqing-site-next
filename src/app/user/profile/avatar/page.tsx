import { Metadata } from "next";
import { redirect,RedirectType } from "next/navigation";

export const metadata: Metadata = {
  title: "Keqing | Profile | Card",
};

export default function Route() {
  redirect(`/user/profile`, RedirectType.replace);
}
