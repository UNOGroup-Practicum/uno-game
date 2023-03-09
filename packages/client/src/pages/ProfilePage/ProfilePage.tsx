import { Container, Link, Typography, Button, Stack, TextField, Box, Avatar } from "@mui/material";
import styles from "./ProfilePage.module.scss";
import { ROUTES } from "../../constants";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "../../services/hooks";
import {
  InputNames,
  REQUIRED_MESSAGE,
  validationTemplate,
} from "../../utils/validation/validation";
import { authSelect, authThunks } from "../../services/slices/auth-slice";
import React from "react";
import { currentUserData } from "../ForumPage/data/data";
import changeAvatar from "../../../public/change-avatar.png";

type TFormInput = {
  email: string;
  login: string;
  password: string;
};

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(authSelect);
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      login: "",
      password: "",
    },
    mode: "onChange",
  });

  const onChangeAvatar = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTargetFiles = event.currentTarget.files;
    if (eventTargetFiles) {
      const newAvatar = eventTargetFiles[0];
      const formData = new FormData();
      formData.append("avatar", newAvatar);

      // здесь будет отправка formData на сервер
      console.log(newAvatar);
    }
  };

  const onSubmit: SubmitHandler<TFormInput> = (data) => {
    dispatch(authThunks.login(data));
  };

  return (
    <div className={styles.profile}>
      <Container maxWidth="md">
        <div className={styles.profile__photo}>
          <Avatar src={currentUserData.avatar} sx={{ width: 100, height: 100 }} />
          <div className={styles.profile__photo_edit}>
            <input
              className={styles.profile__photo_edit_input}
              type="file"
              accept=".jpg, .jpeg, .png"
              name="avatar"
              onInput={onChangeAvatar}
              title=""
            />
            <img src={changeAvatar} alt="photo" className={styles.profile__photo_edit_img} />
          </div>
        </div>

        <form
          name="login-form"
          className={styles.profile__form_auth}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={3}>
            <Controller
              control={control}
              name="email"
              rules={validationTemplate(InputNames.EMAIL)}
              render={({ field }) => (
                <TextField
                  variant="filled"
                  label="Email"
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
              ...Загрузка
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
            disabled={!isValid}
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
