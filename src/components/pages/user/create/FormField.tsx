import { FC, PropsWithChildren } from "react";

interface FormFieldProps {
  name: string;
  required?: boolean;
  error?: string;
}

const FormField: FC<PropsWithChildren<FormFieldProps>> = ({ children, name, required, error }) => {
  return (
    <fieldset className="flex gap-7 p-2 ">
      <div className="flex-2 w-28">
        <p className="text-lg text-white">
          {name}
          {required ?? true ? <span className="text-red-300">*</span> : null}
        </p>
      </div>
      <div className="flex-1">
        {children}
        {error ? <p className="text-sm text-red-400">{error}</p> : null}
      </div>
    </fieldset>
  );
};

export default FormField;
