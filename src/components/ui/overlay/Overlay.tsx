import { FC, ReactNode } from "react";

interface OverlayProps {
  children: ReactNode;
  backgroundUrl: string;
}

const Overlay: FC<OverlayProps> = ({ children, backgroundUrl }) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${backgroundUrl})`,
      }}
      className="bg-cover bg-center bg-no-repeat h-[100vh]"
    >
      {children}
    </div>
  );
};

export default Overlay;
