import { FC, ReactNode } from "react";

interface ModalLayoutProps {
  children: ReactNode;
  className?: string;
}

const ModalLayout: FC<ModalLayoutProps> = ({ children, className }) => {
  return (
    <div className={`fixed h-full w-full bg-black/50 top-0 left-0 ${className}`}>{children}</div>
  );
};

export default ModalLayout;
