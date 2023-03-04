import { Container, Typography, Stack, TextField, Button, Link } from "@mui/material";
import styles from "./RegisterPage.module.scss";
import { routes } from "../../constants";

export const RegisterPage = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" marginBottom={3}>
          Регистрация
        </Typography>
        <form name="registration-name" className={styles.form__auth}>
          <Stack spacing={3}>
            <TextField
              variant="filled"
              label="Email"
              type="email"
              id="email"
              name="email"
              helperText="(EN), непробельные знаки, @..., .домен"
            />
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
            <TextField
              variant="filled"
              label="Подтвердите пароль"
              type="password"
              id="confirm_password"
              name="confirm_password"
              helperText="Пароли не совпадают"
            />
          </Stack>
          <Button
            fullWidth={true}
            size="large"
            type="submit"
            variant="contained"
            color="warning"
            sx={{
              marginTop: "50px",
              marginBottom: "10px",
            }}
          >
            Регистрация
          </Button>
          <Link href={routes["sign-in"].path} underline="none">
            <Typography align="center" fontSize="16px" color="text.disabled" fontWeight="bold">
              Войти
            </Typography>
          </Link>
        </form>
      </Container>
    </div>
  );
};
