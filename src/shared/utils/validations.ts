import { FormValidateStatus } from "@/hooks/useFormField";

type ValidationResultFn<T = unknown> = (value: T) => T;
type ValidationProcessFn<T = unknown> = (
  errorMessage: string,
  ...args: any[]
) => ValidationResultFn<T>;

export const buildValidation = <T = unknown>(
  ...fns: ValidationResultFn<T>[]
): ((value: T) => FormValidateStatus) => {
  return <TT = T>(value: TT): FormValidateStatus => {
    const reducedValue = fns.reduce((acc, fn): T | undefined => {
      try {
        if (!acc) return acc;

        return fn(acc);
      } catch {
        return undefined;
      }
    }, value as T | undefined);

    if (reducedValue) return "valid";

    return "invalid";
  };
};

export const getValidationError = (cb: () => FormValidateStatus): string | undefined => {
  try {
    const res = cb();

    if (res === "invalid") {
      throw new Error("Invalid value");
    }

    return undefined;
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    }

    return "Invalid value";
  }
};

export namespace Validations {
  export const minLengthString: ValidationProcessFn<string> =
    (errorMessage, minLength: number = 0) =>
    (value) => {
      if (value.trim().replace(" ", "").length > minLength) return value;
      throw new Error(errorMessage);
    };

  export const emailPattern: ValidationProcessFn<string> = (errorMessage) => (value) => {
    if (/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(value)) return value;
    throw new Error(errorMessage);
  };
}
