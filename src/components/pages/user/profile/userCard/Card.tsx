import { KqsProfile } from "@prisma/client";
import { FC, ReactElement, ReactNode } from "react";

interface CardProps {
  profile: KqsProfile;
  children?: ReactNode;
  avatarComponent: ReactElement;
}

const Card: FC<CardProps> = ({ profile, children, avatarComponent }) => {
  return (
    <div
      className="relative w-[450px] h-52 p-4 rounded-lg profile-card-shadow transition-all ease-out"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundImage: `url(${profile.background})`,
      }}
    >
      <div className="flex items-start gap-4">
        {avatarComponent}
        <div className="text-white text-lg font-normal flex-1">
          <h4 className="capitalize max-w-[250px] text-ellipsis whitespace-nowrap overflow-hidden">
            Ім&apos;я: {profile.name}
          </h4>
          <p className="max-w-[250px] text-ellipsis whitespace-nowrap overflow-hidden">
            ID: {profile.id}
          </p>
          <p className="capitalize max-w-[250px] text-ellipsis whitespace-nowrap overflow-hidden">
            Місто: {profile.city}
          </p>
          <p className="capitalize max-w-[250px] text-ellipsis whitespace-nowrap overflow-hidden">
            Елемент: {profile.element}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Card;
