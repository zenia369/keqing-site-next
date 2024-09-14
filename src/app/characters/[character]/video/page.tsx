import { redirect,RedirectType } from "next/navigation";

export default function Route({ params }: { params: { character: string } }) {
  redirect(`/characters/${params.character}`, RedirectType.replace);
}
