import React, { useState } from "react";
import { Container } from "@mui/material";
import { Stack } from "@mui/material";
import styles from "./LoginPage.module.scss";
import ControlledInput from "../../components/elements/input/Input";
import ControlledButton from "../../components/elements/button/Button";
import { checkAuthInputValue } from "../../utils/utils-validate/checkAuthInputValues";
import { submitAuthForm } from "../../utils/utils-validate/submitAuthForm";

export const LoginPage = () => {
  // Declare State
  // State for password
  const [password, setPassword] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  // State for login
  const [login, setLogin] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [loginError, setLoginError] = useState(false);

  // Declare handlers for form
  const handlerSubmitForm: React.FormEventHandler<HTMLFormElement> = (event): void => {
    event.preventDefault();
  };

  const handlerButtonClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.preventDefault();
    submitAuthForm({
      sendData: { login: login, password: password },
      errorMessages: { login: loginErrorMessage, password: passwordErrorMessage },
      pageType: "Sign-in",
    });
  };

  // Declare handler for LoginField
  const handlerLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkAuthInputValue({
      event,
      setInputCallback: setLogin,
      setInputErrorMessageCallback: setLoginErrorMessage,
      setInputErrorCallback: setLoginError,
      inputType: "Login",
    });
  };

  // Declare handler for PasswordField
  const handlerPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    checkAuthInputValue({
      event,
      setInputCallback: setPassword,
      setInputErrorMessageCallback: setPasswordErrorMessage,
      setInputErrorCallback: setPasswordError,
      inputType: "Password",
    });
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <h1 className={styles.login__headline}>Вход</h1>
        <form name="login-form" className={styles.form__auth} onSubmit={handlerSubmitForm}>
          <Stack spacing={3}>
            <ControlledInput
              label="Логин"
              type="text"
              id="login"
              name="login"
              value={login}
              helperText={loginErrorMessage}
              error={loginError}
              onChange={handlerLoginChange}
              onBlur={handlerLoginChange}
            />
            <ControlledInput
              label="Пароль"
              type="password"
              id="password"
              name="password"
              value={password}
              helperText={passwordErrorMessage}
              error={passwordError}
              onChange={handlerPasswordChange}
              onBlur={handlerPasswordChange}
            />
          </Stack>
          <ControlledButton text="Войти" onClick={handlerButtonClick}></ControlledButton>
        </form>
      </Container>
    </div>
  );
};
