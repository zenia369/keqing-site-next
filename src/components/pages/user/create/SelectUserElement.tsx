"use client";

import SelectOption from "@/components/ui/core/select/SelectOption";
import { elementsList } from "@/shared/constants";

const config = {
  name: "element",
};

const SelectUserElement = () => {
  return (
    <SelectOption.Wrapper>
      <SelectOption.Select className="w-full" name={config.name}>
        <SelectOption.Option disabled selected>
          Choose
        </SelectOption.Option>
        {elementsList.map((option, idx) => (
          <SelectOption.Option key={config.name + idx} value={option}>
            {option}
          </SelectOption.Option>
        ))}
      </SelectOption.Select>
    </SelectOption.Wrapper>
  );
};

export default SelectUserElement;
