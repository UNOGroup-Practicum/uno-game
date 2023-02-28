import React from "react";
import { Container, Link, Typography } from "@mui/material";
import { Stack } from "@mui/material";
import styles from "./LoginPage.module.scss";
import ControlledInput from "../../components/elements/input/Input";
import { ControlledButton } from "../../components/elements/button/Button";
import { routes } from "../../constants";

export const LoginPage = () => {
  // Declare handlers for form
  const handlerSubmitForm: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
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
              helperText="От 3 до 20 знаков (EN)"
            />
            <ControlledInput
              label="Пароль"
              type="password"
              id="password"
              name="password"
              helperText="От 8 до 40 символов (EN), обязательно хотя бы одна заглавная буква и цифра"
            />
          </Stack>
          <ControlledButton text="Войти"></ControlledButton>
        </form>
      </Container>
      <Link href={routes["sign-up"].path} underline="none">
        <Typography
          align="center"
          fontSize="16px"
          color="text.disabled"
          fontWeight="bold"
          marginTop="16px"
        >
          Нет аккаунта?
        </Typography>
      </Link>
    </div>
  );
};
