"use client";

import { cloneElement,FC, ReactElement } from "react";

interface AvatarProps {
  photo: string;
  name: string;
  children?: ReactElement;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ children = <div />, name, photo, className }) => {
  return cloneElement(children, {
    className: `w-28 h-28 bg-white rounded-full flex items-center justify-center border-2 border-orange-400/80 group profile-card-avatar transition ${className}`,
    children: (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={photo}
        alt={`Avatar of user: ${name}`}
        className="bg-orange-400/80 rounded-full w-[100px] h-[100px] group-hover:brightness-75 transition"
      />
    ),
  });
};

export default Avatar;
