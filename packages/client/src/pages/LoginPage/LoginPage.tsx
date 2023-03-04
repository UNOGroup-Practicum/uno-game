import React from "react";
import { Container, Link, Typography, Button, Stack, TextField } from "@mui/material";
import styles from "./LoginPage.module.scss";
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
        <Typography variant="h4" component="h1" align="center" marginBottom={3}>
          Вход
        </Typography>
        <form name="login-form" className={styles.form__auth} onSubmit={handlerSubmitForm}>
          <Stack spacing={3}>
            <TextField
              variant="filled"
              label="Логин"
              type="text"
              id="login"
              name="login"
              helperText="От 3 до 20 знаков (EN)"
            />
            <TextField
              variant="filled"
              label="Пароль"
              type="password"
              id="password"
              name="password"
              helperText="От 8 до 40 символов (EN), обязательно хотя бы одна заглавная буква и цифра"
            />
          </Stack>
          <Button
            fullWidth={true}
            size="large"
            type="submit"
            variant="contained"
            color="warning"
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
