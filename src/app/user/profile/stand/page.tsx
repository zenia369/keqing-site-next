import { Metadata } from "next";
import { redirect,RedirectType } from "next/navigation";

export const metadata: Metadata = {
  title: "Keqing | Profile | Stand",
};

export default function Route() {
  redirect(`/user/profile`, RedirectType.replace);
}
