"use client";

import { FC } from "react";

import { FilterProps } from "./filter.models";
import FilterCard from "./FilterCard";
import InputRange from "./InputRange";

const Filter: FC<FilterProps> = ({
  filterParams,
  limit,
  isDisabled,
  handleFilterClick,
  handleChangeRange,
  handleUpdateFilter,
}) => (
  <aside>
    <h4 className="capitalize text-2xl font-semibold text-purple-300 border-b border-b-slate-500">
      Фільтри
    </h4>
    <div className="p-2 flex flex-col gap-2">
      {filterParams.map((filter) => (
        <FilterCard key={filter.id} item={filter} onClick={handleUpdateFilter} />
      ))}
    </div>
    <h4 className="mt-3 capitalize text-2xl font-semibold text-purple-300 border-b border-b-slate-500">
      Налаштування
    </h4>
    <div>
      <p className="mt-4 text-lg text-black">Ліміт:</p>
      <InputRange limit={limit} handleChangeRange={handleChangeRange} />
    </div>
    <button
      className="mt-6 w-full text-lg p-2 rounded-lg text-center border border-gray-200 bg-purple-300 hover:bg-purple-400 text-white disabled:bg-purple-200 disabled:cursor-not-allowed"
      onClick={handleFilterClick}
      disabled={isDisabled}
    >
      Зберегти
    </button>
  </aside>
);

export default Filter;
