import {
  HTMLAttributes,
  LabelHTMLAttributes,
  OptionHTMLAttributes,
  PropsWithChildren,
  SelectHTMLAttributes,
} from "react";

const Wrapper = ({
  children,
  className,
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => (
  <div {...props} className={`flex items-center gap-2 text-white ${className}`}>
    {children}
  </div>
);

const Label = ({
  children,
  className,
  ...props
}: PropsWithChildren<LabelHTMLAttributes<HTMLLabelElement>>) => (
  <label {...props} className={`capitalize ${className}`}>
    {children}
  </label>
);

const Select = ({
  children,
  className,
  ...props
}: PropsWithChildren<SelectHTMLAttributes<HTMLSelectElement>>) => (
  <select {...props} className={`rounded p-1 outline-purple-400 text-black ${className}`}>
    {children}
  </select>
);

const Option = ({
  children,
  className,
  ...props
}: PropsWithChildren<OptionHTMLAttributes<HTMLOptionElement>>) => (
  <option {...props} className={`capitalize ${className}`}>
    {children}
  </option>
);

interface SelectOptionProps {
  id: string;
  name: string;
  options: string[];
}

const SelectOption = ({ id, name, options }: SelectOptionProps) => {
  return (
    <Wrapper>
      <Label id={id}>{name}</Label>
      <Select name={id} id={id}>
        <Option disabled selected>
          Choose
        </Option>
        {options.map((option, idx) => (
          <Option key={name + idx} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </Wrapper>
  );
};

SelectOption.Wrapper = Wrapper;
SelectOption.Label = Label;
SelectOption.Select = Select;
SelectOption.Option = Option;

export default SelectOption;
