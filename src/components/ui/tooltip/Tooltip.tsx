"use client";

import { FC, ReactNode, useState } from "react";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  const [isHover, setIsHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className="relative"
    >
      {children}
      {isHover && (
        <p className="absolute w-max p-[5px] bg-purple-300 text-xs text-white rounded-md max-w-[300px] left-2/4 right-2/4 -translate-x-2/4 translate-y-1/3">
          {text}
        </p>
      )}
    </div>
  );
};

export default Tooltip;
