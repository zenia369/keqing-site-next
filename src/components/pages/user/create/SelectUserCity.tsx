"use client";

import SelectOption from "@/components/ui/core/select/SelectOption";
import { citiesList } from "@/shared/constants";

const config = {
  name: "city",
};

const SelectUserCity = () => {
  return (
    <SelectOption.Wrapper>
      <SelectOption.Select className="w-full" name={config.name}>
        <SelectOption.Option disabled selected>
          Choose
        </SelectOption.Option>
        {citiesList.map((option, idx) => (
          <SelectOption.Option key={config.name + idx} value={option}>
            {option}
          </SelectOption.Option>
        ))}
      </SelectOption.Select>
    </SelectOption.Wrapper>
  );
};

export default SelectUserCity;
