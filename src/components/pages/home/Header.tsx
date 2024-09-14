import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import electroImg from "@/assets/images/electro.png";
import mainImg from "@/assets/images/keqing.png";
import { AppLinks } from "@/shared/appLinks";

const Header: FC = () => {
  return (
    <header className="my-8">
      <div className="flex items-center justify-around gap-9">
        <Image src={mainImg} alt="keqing" width={410} height={410} />
        <div className="flex justify-center flex-col gap-5">
          <div className="flex items-center gap-4">
            <h1 className="text-5xl font-light text-black">Keqing/Ке Цин</h1>
            <Image src={electroImg} alt="electro" width={80} height={80} />
          </div>
          <p className="w-[600px] text-xl text-black ml-3">
            Найголовніший трудоголік Лі Ює. На її думку працювати треба за десятьох, а якість має
            бути найкращою. Також сама вона каже що час богів пройшов, люди мають відповідати за
            свою долю, - виявляється боги любять таких скептиків.
          </p>
          <p className="text-black ml-4 text-base">
            *Взагалі, вона чудова і приємна дівчина. Обожнюю ЇЇ!!
          </p>
          <Link
            href={AppLinks.KeqingPage}
            className="self-end px-5 py-2 border border-purple-400 w-fit rounded-2xl text-purple-400 text-xl hover-shadow-purple hover:text-white hover:bg-purple-400 transition-all ease-in-out duration-150"
          >
            дуже цікаво, хочу ще...
          </Link>
        </div>
      </div>
      <div></div>
    </header>
  );
};

export default Header;
