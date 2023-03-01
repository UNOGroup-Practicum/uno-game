import React from "react";
import { Container, Link, Typography, Button, Stack } from "@mui/material";
import styles from "./LoginPage.module.scss";
import { routes } from "../../constants";
import { LOCAL_STORAGE_THEME_KEY } from "../../theme/ThemeContext";
import ControlledInput from "../../components/elements/Input/Input";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    difColor: true;
  }
}

const currentTheme = () => localStorage.getItem(LOCAL_STORAGE_THEME_KEY);

export const LoginPage = () => {
  // Declare handlers for form
  const handlerSubmitForm: React.FormEventHandler<HTMLFormElement> = (
    event: React.FormEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="md" sx={{}}>
        <Typography
          variant="h4"
          component="h2"
          align="center"
          marginBottom={3}
          color={currentTheme() === "light" ? "black" : "white"}
        >
          Вход
        </Typography>
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
          <Button
            size="large"
            type="submit"
            variant="difColor"
            sx={{
              marginTop: "100px",
              marginBottom: "10px",
            }}
          >
            Войти
          </Button>
        </form>
        <Link href={routes["sign-up"].path} underline="none">
          <Typography align="center" fontSize="16px" color="text.disabled" fontWeight="bold">
            Нет аккаунта?
          </Typography>
        </Link>
      </Container>
    </div>
  );
};
