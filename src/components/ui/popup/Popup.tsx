"use client";

import { FC, ReactNode, useEffect, useState } from "react";

import Modal from "@/components/ui/modal/Modal";

interface PopupProps {
  isVisible: boolean;
  children: ReactNode;
  time?: number;
  className?: string;
}

const Popup: FC<PopupProps> = ({ isVisible, className, time, children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isVisible || !time) return;

    const timer = setTimeout(() => {
      setShow((prev) => !prev);
    }, time);

    return () => clearTimeout(timer);
  }, [time, isVisible]);

  if (!isVisible || show) return null;

  return (
    <Modal>
      <div className={`fixed ${className ? className : ""}`}>{children}</div>
    </Modal>
  );
};

export default Popup;
