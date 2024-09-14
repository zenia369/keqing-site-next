"use client";

import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal: FC<PropsWithChildren> = ({ children }) => {
  const elRef = useRef(document?.createElement("div"));

  useEffect(() => {
    document?.querySelector("#modal-root")?.appendChild(elRef.current);

    return () => {
      if (elRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        document?.querySelector("#modal-root")?.removeChild(elRef?.current);
      }
    };
  }, []);

  return createPortal(children, elRef.current);
};

export default Modal;
