import { FC, ReactNode } from "react";

import aboutBG from "@/assets/images/about-bg.png";

interface OverlayProps {
  children: ReactNode;
}

const Overlay: FC<OverlayProps> = ({ children }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${aboutBG.src})`,
      }}
      className="bg-cover bg-center bg-no-repeat h-[100vh]"
    >
      {children}
    </div>
  );
};

export default Overlay;
