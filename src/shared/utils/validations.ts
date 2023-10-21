import { FormValidateStatus } from "@/hooks/useFormField";

type ValidationsFn<T> = (errorMessage: string, ...args: any[]) => (value: T) => T;

export const buildValidation = (...fns: Function[]) => {
  return <T>(value: T): FormValidateStatus => {
    const reducedValue = fns.reduce((acc, fn) => (acc ? fn(acc) : false), value) as T | boolean;
    if (reducedValue) return "valid";
    return "unvalid";
  };
};

export namespace Validations {
  export const minLenghtString: ValidationsFn<string> =
    (errorMessage, minLength: number = 0) =>
    (value) => {
      if (value.trim().replace(" ", "").length > minLength) return value;
      throw new Error(errorMessage);
    };

  export const emailPattern: ValidationsFn<string> = (errorMessage) => (value) => {
    if (/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) return value;
    throw new Error(errorMessage);
  };
}
