"use client";

import { FC, FormEventHandler } from "react";

import useFormField, { FormOptions } from "@/hooks/useFormField";
import { buildValidation, Validations } from "@/shared/utils/validations";

import { useFormReactionContext } from "./context/FormReaction.context";
import { sendEmailSelf } from "./services";

const emailField: FormOptions<string> = {
  initialValue: "",
  validate: buildValidation(
    Validations.minLengthString("Мінімальна кількість літер в елетроній пошті становит 3", 3),
    Validations.emailPattern("Не вірний патер елетроної пошти")
  ),
  customErrorMessage: (error) => `Поле електроної пошити: ${error}`,
};
const textField: FormOptions<string> = {
  initialValue: "",
  validate: buildValidation(
    Validations.minLengthString("Мінімальна кількість літер становит 10", 10)
  ),
  customErrorMessage: (error) => `Поле повідомлення: ${error}`,
};

const SendFrom: FC = () => {
  const {
    value: emailValue,
    setValue: setEmailValue,
    error: emailError,
    isError: isEmailError,
    isValid: isEmailValid,
    reset: resetEmail,
  } = useFormField(emailField);
  const {
    value: textValue,
    setValue: setTextValue,
    error: textError,
    isError: isTextError,
    isValid: isTextValid,
    reset: resetText,
  } = useFormField(textField);
  const { setActiveReaction } = useFormReactionContext();

  const isError = isEmailError || isTextError;
  const isValid = !isError && isEmailValid && isTextValid;
  const error = [emailError, textError];

  const handleSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    if (!isValid) return;

    try {
      setActiveReaction("kq-sending");

      await sendEmailSelf({
        from: emailValue,
        message: textValue,
      });

      setActiveReaction("kq-success");
      resetEmail();
      resetText();
    } catch (error) {
      setActiveReaction("kq-error");
    }
  };

  return (
    <>
      {isError ? (
        <div className="flex flex-col gap-2">
          {error.filter(Boolean).map((message) => (
            <p key={message} className="bg-red-100 p-3 rounded-lg">
              {message}
            </p>
          ))}
        </div>
      ) : null}
      <form onSubmit={handleSubmit} className="flex gap-28">
        <fieldset className="flex flex-col gap-5 flex-grow">
          <input
            name="kq-email"
            placeholder="Елетронна пошта"
            type="text"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            className="outline-none p-5 w-full border border-purple-400 rounded-md shadow-outline"
          />
          <button
            type="submit"
            className="p-3 text-white bg-purple-400 rounded-md border-none drop-shadow-xl shadow-purple-300 hover:drop-shadow-2xl disabled:bg-purple-300"
            disabled={!isValid}
          >
            Надіслати
          </button>
        </fieldset>
        <textarea
          name="kq-text"
          placeholder="Пиши тут..."
          cols={30}
          rows={10}
          value={textValue}
          onChange={(e) => setTextValue(e.target.value)}
          className="flex-grow-[2] resize-none outline-none p-5 border border-purple-400 rounded-md shadow-outline"
        ></textarea>
      </form>
    </>
  );
};

export default SendFrom;
