"use client";

import { FC, ReactNode, useRef } from "react";

import Modal from "../modal/Modal";
import useTooltip from "./hooks/useTooltip";

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: FC<TooltipProps> = ({ children, text }) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLParagraphElement>(null);
  const { isVisible, onMouseEnter, onMouseLeave, position } = useTooltip(
    tooltipRef,
    tooltipTextRef
  );

  return (
    <div ref={tooltipRef} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      {children}
      {isVisible ? (
        <Modal>
          <p
            ref={tooltipTextRef}
            className="fixed z-30 w-max p-[5px] bg-purple-300 text-xs text-white rounded-md max-w-[300px] "
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            {text}
          </p>
        </Modal>
      ) : null}
    </div>
  );
};

export default Tooltip;
