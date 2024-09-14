import { FC } from "react";

import { cn } from "@/shared/utils/common";

import { FilterCardProps } from "./filter.models";

const FilterCard: FC<FilterCardProps> = ({ item, onClick }) => {
  if (!item.filters.length) return null;

  return (
    <div className="border border-gray-200 shadow-sm rounded-lg p-3">
      <p className="text-lg text-black">{item.value}:</p>
      <ul className="flex flex-wrap gap-1">
        {item.filters.map(({ checked, id, value }) => (
          <li key={id}>
            <button
              onClick={onClick(id, item.id)}
              className={cn(
                "flex justify-center items-center gap-1 p-1 rounded-lg border  hover:border-gray-200",
                {
                  "border-gray-300": checked,
                  "border-transparent": !checked,
                }
              )}
            >
              <div
                className={cn("h-2 w-2  rounded-full", {
                  "bg-purple-400": checked,
                  "bg-purple-200": !checked,
                })}
              />
              <p>{value}</p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCard;
