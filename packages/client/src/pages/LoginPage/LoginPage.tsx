import { Box, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";

import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { useDispatch, useSelector } from "services/hooks";
import { authSelect, authSlice, authThunks } from "services/slices/auth-slice";
import { InputNames, REQUIRED_MESSAGE, validationTemplate } from "utils/validation/validation";

import { ROUTES } from "../../constants";

import styles from "./LoginPage.module.scss";

type TFormInput = {
  login: string;
  password: string;
};

export const LoginPage = () => {
  const dispatch = useDispatch();
  const { error: authError, loading } = useSelector(authSelect);
  const [authErrorLocal, setAuthErrorLocal] = useState(authError);
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

  useEffect(() => {
    if (authError) {
      setAuthErrorLocal(authError);
      dispatch(authSlice.actions.resetError());
    }
  }, [dispatch, authError, setAuthErrorLocal]);

  const onSubmit: SubmitHandler<TFormInput> = async (data) => {
    authErrorLocal && setAuthErrorLocal(null);
    dispatch(authThunks.login(data));
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
              rules={{
                required: REQUIRED_MESSAGE,
              }}
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
          {loading && (
            <Box mt={2} textAlign={"center"}>
              ...Loading
            </Box>
          )}
          {authErrorLocal && (
            <Box mt={2} textAlign={"center"} color={"error.light"}>
              {authErrorLocal}
            </Box>
          )}
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
            disabled={!isValid || loading}
          >
            Войти
          </Button>
        </form>
        <Link href={ROUTES.signUp.path} underline="none">
          <Typography align="center" fontSize="16px" color="text.disabled" fontWeight="bold">
            Нет аккаунта?
          </Typography>
        </Link>
      </Container>
    </div>
  );
};
