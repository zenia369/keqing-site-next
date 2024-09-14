import { FC } from "react";

import { FilterProps } from "./filter.models";

const InputRange: FC<Pick<FilterProps, "limit" | "handleChangeRange">> = ({
  limit,
  handleChangeRange,
}) => (
  <div className="flex items-center gap-2">
    <input
      type="range"
      onChange={(event) => handleChangeRange(Number(event.target.value))}
      value={limit}
      min={10}
      max={40}
      step={10}
      className="w-full accent-purple-500"
    />
    <span className="border px-2 py-1 rounded-md">{limit}</span>
  </div>
);

export default InputRange;
