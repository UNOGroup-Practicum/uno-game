import { Container, Link, Typography, Button, Stack, TextField } from "@mui/material";
import styles from "./LoginPage.module.scss";
import { routes } from "../../constants";

import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { InputNames, validationTemplate } from "../../utils/validation/validation";

type TFormInput = {
  login: string;
  password: string;
};

export const LoginPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" marginBottom={3}>
          Вход
        </Typography>
        <form name="login-form" className={styles.form__auth} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <Controller
              control={control}
              name="login"
              rules={validationTemplate(InputNames.LOGIN)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Логин"
                  type="text"
                  id="login"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.login?.message}
                  helperText={errors.login?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={validationTemplate(InputNames.PASSWORD)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Пароль"
                  type="password"
                  id="password"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              )}
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
            disabled={!isValid}
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
