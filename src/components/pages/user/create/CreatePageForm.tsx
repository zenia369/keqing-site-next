"use client";

import { useRouter } from "next/navigation";
import { FC, FormEventHandler, useState } from "react";

import { AppLinks } from "@/shared/appLinks";
import { cn } from "@/shared/utils/common";
import { buildValidation, getValidationError } from "@/shared/utils/validations";

import FormField from "./FormField";
import SelectUserCity from "./SelectUserCity";
import SelectUserElement from "./SelectUserElement";
import { createUser } from "./services";

interface CreatePageFormProps {
  username: string | null;
}

const formFieldValidation = buildValidation<string | null>(
  (value) => {
    if (typeof value === "string" && value.trim()) return value;
    throw new Error(`Значення має бути текстом: ${value}`);
  },
  (value) => {
    if (!value || value?.length > 2) return value;
    throw new Error("Користувач має бути наданий");
  }
);

const CreatePageForm: FC<CreatePageFormProps> = ({ username }) => {
  const [errors, setErrors] = useState<{
    username?: string;
    city?: string;
    element?: string;
  }>({ username: undefined, city: undefined, element: undefined });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formEl = e.currentTarget;

    const formData = new FormData(formEl);
    const username = formData.get("username");
    const city = formData.get("city");
    const element = formData.get("element");

    const usernameErrorMessage = getValidationError(() =>
      formFieldValidation(username ? String(username) : username)
    );
    const cityErrorMessage = getValidationError(() =>
      formFieldValidation(city ? String(city) : city)
    );
    const elementErrorMessage = getValidationError(() =>
      formFieldValidation(element ? String(element) : element)
    );

    if (usernameErrorMessage || cityErrorMessage || elementErrorMessage) {
      setErrors({
        city: cityErrorMessage,
        element: elementErrorMessage,
        username: usernameErrorMessage,
      });
      return;
    }

    try {
      setErrors({});
      setLoading(true);

      await createUser({
        city: String(city),
        username: String(username),
        element: String(element),
      });

      formEl.reset();
      router.replace(AppLinks.Profile);
    } catch (error) {
      // empty
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-20 flex flex-col gap-4" onSubmit={handleSubmit}>
      <FormField name="Ім'я" required={false} error={errors?.username}>
        <input
          type="text"
          id="username"
          name="username"
          className="rounded p-1 bg-white outline-purple-400 text-black w-full"
          defaultValue={username ?? undefined}
        />
      </FormField>
      <FormField name="Місто" error={errors?.city}>
        <SelectUserCity />
      </FormField>
      <FormField name="Елемент" error={errors?.element}>
        <SelectUserElement />
      </FormField>
      <button
        type="submit"
        className={cn("bg-green-500 text-white hover:bg-green-400 transition flex-1 p-2 rounded", {
          "disabled:bg-green-300 cursor-not-allowed": loading,
        })}
        disabled={loading}
      >
        {loading ? `Створення профілю для ${username}...` : "Вперед до пригод"}
      </button>
    </form>
  );
};

export default CreatePageForm;
