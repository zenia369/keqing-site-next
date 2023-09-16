import { FC, ReactNode } from "react";

interface CardProps {
  title: string;
  children: ReactNode;
  classes?: string;
}

const Card: FC<CardProps> = ({ title, children, classes = "" }) => {
  return (
    <div
      className={`relative kq-border h-32 w-[500px] flex items-center ${classes}`}
    >
      <h4 className="absolute text-lg py-2 px-6 bg-purple-400/70 opacity-90 text-black rounded-3xl -translate-y-1/2 translate-x-[10%] top-0 left-0">
        {title}
      </h4>
      {children}
    </div>
  );
};

export default Card;
