"use client";

import { KqsElementalTypes, KqsStandCharacters } from "@prisma/client";
import { cloneElement, FC, ReactElement } from "react";

import { cn } from "@/shared/utils/common";

interface StandItemBaseProps {
  character: Pick<KqsStandCharacters, "id" | "name" | "element"> & {
    images: {
      small?: string;
      default?: string;
    } | null;
  };
}

interface StandItemProps extends StandItemBaseProps {
  isSlot: false;
  handleClick: () => void;
  activeId?: KqsStandCharacters["id"];
}

interface StandItemAsSlotProps extends StandItemBaseProps {
  isSlot: true;
  children: ReactElement;
}

const mapCaracherElementToImage: Record<KqsElementalTypes, string> = {
  Anemo: "/static/profile/elements/Element_Anemo.png",
  Cryo: "/static/profile/elements/Element_Cryo.png",
  Electro: "/static/profile/elements/Element_Electro.png",
  Geo: "/static/profile/elements/Element_Geo.png",
  Hydro: "/static/profile/elements/Element_Hydro.png",
  Pyro: "/static/profile/elements/Element_Pyro.png",
};

const StandItemTemplate: FC<Pick<StandItemBaseProps, "character">> = ({ character }) => (
  <>
    <div className="absolute top-0.5 left-0.5">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={mapCaracherElementToImage[character.element]}
        alt={`Character ${character.name} element`}
        className="w-4 h-4"
        title={character.element}
      />
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src={character?.images?.small ?? character?.images?.default}
      alt={`Character ${character.name}`}
      className="rounded-t bg-orange-400 "
    />
    <p className="text-black text-center bg-stone-100 rounded-b uppercase text-[10px] py-1">
      {character.name}
    </p>
  </>
);

const className =
  "inline-block relative rounded group translate-y-0 hover:shadow-lg hover:translate-y-2 hover:shadow-white transition ease";

const StandItem: FC<StandItemProps | StandItemAsSlotProps> = (props) => {
  return props.isSlot ? (
    cloneElement(props.children, {
      className,
      children: <StandItemTemplate character={props.character} />,
    })
  ) : (
    <button
      type="button"
      onClick={props.handleClick}
      className={cn(
        className
          .replace("hover:shadow-white", "hover:shadow-[0px_0px_2px_5px_#7b2cbf]")
          .replace("hover:shadow-lg", "")
          .replace("hover:translate-y-2", "hover:translate-y-0"),
        {
          "hover:translate-y-0 shadow-[0px_0px_2px_5px_#7b2cbf]":
            Boolean(props.activeId) && props.activeId === props.character.id,
        }
      )}
    >
      <StandItemTemplate character={props.character} />
    </button>
  );
};

export default StandItem;
