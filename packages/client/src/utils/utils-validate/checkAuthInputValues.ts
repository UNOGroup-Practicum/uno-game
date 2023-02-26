import React from "react";
import { validateForm } from "./validateAuthForm";

type InputValueProps = {
  event: React.ChangeEvent<HTMLInputElement>;
  setInputCallback: (value: string) => void;
  setInputErrorMessageCallback: (value: string) => void;
  setInputErrorCallback: (value: boolean) => void;
  inputType: "Login" | "Password";
};

export function checkAuthInputValue(props: InputValueProps): void {
  const {
    event,
    setInputCallback,
    setInputErrorCallback,
    setInputErrorMessageCallback,
    inputType,
  } = props;

  setInputCallback(event.target.value);

  const ErrorMessage = validateForm({
    value: event.target.value,
    type: event.target.name,
  });
  setInputErrorMessageCallback(ErrorMessage[inputType]);

  if (ErrorMessage[inputType].length) {
    setInputErrorCallback(true);
  } else {
    setInputErrorCallback(false);
  }
}
