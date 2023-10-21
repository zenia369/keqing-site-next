"use Client";

import { useLayoutEffect, useState } from "react";

export type FormValidateStatus = "untouched" | "valid" | "unvalid";
export type FormOptions<T> = {
  initialValue: T;
  validate?: (value: T) => FormValidateStatus;
  customeErrorMessage?: (value: string) => string;
};

const useFormField = <T = string>({ initialValue, ...options }: FormOptions<T>) => {
  const [value, setValue] = useState(initialValue);
  const [validateStatus, setValidateStatus] = useState<FormValidateStatus>("untouched");
  const [error, setError] = useState<string | null>(null);

  useLayoutEffect(() => {
    if (options?.validate) {
      if (!value) return;

      try {
        const validatedValue = options.validate(value);
        setValidateStatus(validatedValue);
        setError(null);
      } catch (error) {
        const errorMessage = (error as Error).message || (error as any);
        setError(() =>
          options.customeErrorMessage ? options.customeErrorMessage(errorMessage) : errorMessage
        );
        setValidateStatus("unvalid");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, validateStatus, options?.validate]);

  const reset = (newInitialValue: T) => {
    setError(null);
    setValidateStatus("untouched");
    setValue(newInitialValue ?? initialValue);
  };

  return {
    isError: Boolean(error) && validateStatus === "unvalid",
    isValid: !Boolean(error) && validateStatus === "valid",
    error,
    status: validateStatus,
    value,
    setValue,
    reset,
  };
};

export default useFormField;
