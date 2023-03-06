import { useRef } from "react";
import { Container, Typography, Stack, TextField, Button, Link } from "@mui/material";
import styles from "./RegisterPage.module.scss";
import { routes } from "../../constants";

import { Controller, useForm, SubmitHandler } from "react-hook-form";
import {
  ERROR_MESSAGE,
  InputNames,
  REQUIRED_MESSAGE,
  validationTemplate,
} from "../../helpers/validation/validation";

type TFormInput = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
  confirm_password: string;
};

export const RegisterPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      login: "",
      first_name: "",
      second_name: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirm_password, ...result } = data;
    console.log(result);
  };

  const passwordRef = useRef<HTMLInputElement>();

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" marginBottom={3}>
          Регистрация
        </Typography>
        <form
          name="registration-name"
          className={styles.form__auth}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack spacing={3}>
            <Controller
              control={control}
              name="email"
              rules={validationTemplate(InputNames.EMAIL)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Почта"
                  type="email"
                  id="email"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="login"
              rules={validationTemplate(InputNames.LOGIN)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Логин"
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
              name="first_name"
              rules={validationTemplate(InputNames.NAME)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Имя"
                  id="first_name"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.first_name?.message}
                  helperText={errors.first_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="second_name"
              rules={validationTemplate(InputNames.NAME)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Фамилия"
                  id="second_name"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.second_name?.message}
                  helperText={errors.second_name?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={validationTemplate(InputNames.PHONE)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  type="tel"
                  label="Телефон"
                  id="phone"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.phone?.message}
                  helperText={errors.phone?.message}
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
                  inputRef={passwordRef}
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.password?.message}
                  helperText={errors.password?.message}
                />
              )}
            />
            <Controller
              control={control}
              name="confirm_password"
              rules={{
                required: REQUIRED_MESSAGE,
                validate: (value: string) => {
                  if (value !== passwordRef.current?.value) {
                    return ERROR_MESSAGE.CONFIRM_PASSWORD;
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Подтвердите пароль"
                  type="password"
                  id="confirm_password"
                  onChange={field.onChange}
                  value={field.value}
                  error={!!errors.confirm_password?.message}
                  helperText={errors.confirm_password?.message}
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
              marginTop: "50px",
              marginBottom: "10px",
            }}
            disabled={!isValid}
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
