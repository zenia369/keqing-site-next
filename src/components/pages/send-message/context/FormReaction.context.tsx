"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type ReactionTypes = "kq-sending" | "kq-success" | "kq-error";
type FromReactionType = {
  activeReaction: ReactionTypes | undefined;
  setActiveReaction: (value: ReactionTypes) => void;
};

const FormReactionContext = createContext<FromReactionType | null>(null);

export const useFormReactionContext = () => {
  const context = useContext(FormReactionContext);
  if (!context) {
    throw new Error("hook useFormReactionContext should be called in FormReactionContext");
  }

  return context;
};

const FormReactionProvider = ({ children }: { children: ReactNode }) => {
  const [reaction, setReaction] = useState<ReactionTypes>();

  const setActiveReaction = (value: ReactionTypes) => {
    setReaction(value);
    setTimeout(() => {
      setReaction(undefined);
    }, 5000);
  };

  const value: FromReactionType = { activeReaction: reaction, setActiveReaction };

  return <FormReactionContext.Provider value={value}>{children}</FormReactionContext.Provider>;
};

export default FormReactionProvider;
