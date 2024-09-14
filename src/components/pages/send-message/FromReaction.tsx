"use client";

import Image from "next/image";
import { FC } from "react";

import kqSuccess from "@/assets/images/mini-keqing-fan.png";
import kqLoading from "@/assets/images/mini-keqing-fly.png";
import kqError from "@/assets/images/mini-keqing-leiin.png";

import { useFormReactionContext } from "./context/FormReaction.context";

const FromReaction: FC = () => {
  const { activeReaction } = useFormReactionContext();
  return (
    <div className="fixed left-4 bottom-4">
      {activeReaction === "kq-error" && (
        <Image src={kqError} alt="error" width={100} height={100} />
      )}
      {activeReaction === "kq-sending" && (
        <Image src={kqLoading} alt="sending" width={100} height={100} />
      )}
      {activeReaction === "kq-success" && (
        <Image src={kqSuccess} alt="success" width={100} height={100} />
      )}
    </div>
  );
};

export default FromReaction;
