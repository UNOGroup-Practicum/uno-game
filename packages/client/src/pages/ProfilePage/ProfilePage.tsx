import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { transformUserForRequest } from "services/api/transformers";
import { User, UserDTO } from "services/api/types";
import { authSelect } from "services/slices/auth-slice";
import { InputNames, validationTemplate } from "utils/validation/validation";

import { ROUTES } from "../../constants";

import styles from "./ProfilePage.module.scss";

export const ProfilePage: React.FC = () => {
  const [isInputChanged, setIsInputChanged] = useState(false);
  const { user } = useSelector(authSelect);
  const transformedUser = transformUserForRequest(user as User);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...(transformedUser as UserDTO),
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset(transformedUser);
  }, [user]);

  const onChangeAvatar = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTargetFiles = event.currentTarget.files;
    if (eventTargetFiles) {
      const newAvatar = eventTargetFiles[0];
      const formData = new FormData();
      formData.append("avatar", newAvatar);

      // здесь будет отправка formData
      console.log(newAvatar);
    }
  };

  const onSubmit: SubmitHandler<UserDTO> = (data) => {
    // здесь будет отправка данных
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <main className={styles.profile}>
      <Container maxWidth="md">
        <section className={styles.profile__photo}>
          <Avatar
            src={`${import.meta.env.VITE_API_ENDPOINT}/resources${user?.avatar}`}
            sx={{ width: 100, height: 100 }}
          />
          <div className={styles.profile__photo_edit}>
            <input
              className={styles.profile__photo_edit_input}
              type="file"
              accept=".jpg, .jpeg, .png"
              name="avatar"
              onInput={onChangeAvatar}
              title=""
            />
            <EditIcon className={styles.profile__photo_edit_img} />
          </div>
        </section>

        <form
          name="profile-form"
          className={styles.profile__form}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <Stack spacing={3}>
            <Controller
              name="email"
              rules={validationTemplate(InputNames.EMAIL)}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Почта"
                  type="email"
                  id="email"
                  variant="standard"
                  InputLabelProps={{ shrink: false }}
                  onChange={field.onChange}
                  onInput={() => setIsInputChanged(true)}
                  value={field.value}
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="login"
              rules={validationTemplate(InputNames.LOGIN)}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Логин"
                  id="login"
                  variant="standard"
                  InputLabelProps={{ shrink: false }}
                  onChange={field.onChange}
                  onInput={() => setIsInputChanged(true)}
                  value={field.value}
                  error={!!errors.login?.message}
                  helperText={errors.login?.message}
                />
              )}
            />
            <Controller
              name="display_name"
              rules={validationTemplate(InputNames.NAME)}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Отображаемое имя"
                  id="display_name"
                  variant="standard"
                  InputLabelProps={{ shrink: false }}
                  onChange={field.onChange}
                  onInput={() => setIsInputChanged(true)}
                  value={field.value}
                  error={!!errors.display_name?.message}
                  helperText={errors.display_name?.message}
                />
              )}
            />
            <Controller
              name="first_name"
              rules={validationTemplate(InputNames.NAME)}
              control={control}
              render={({ field }) => (
                <TextField
                  label="Имя"
                  id="first_name"
                  variant="standard"
                  InputLabelProps={{ shrink: false }}
                  onChange={field.onChange}
                  onInput={() => setIsInputChanged(true)}
                  value={field.value}
                  error={!!errors.first_name?.message}
                  helperText={errors.first_name?.message}
                />
              )}
            />
            <Controller
              name="second_name"
              rules={validationTemplate(InputNames.NAME)}
              control={control}
              render={({ field }) => (
                <TextField
                  variant="standard"
                  label="Фамилия"
                  id="second_name"
                  InputLabelProps={{ shrink: false }}
                  onChange={field.onChange}
                  onInput={() => setIsInputChanged(true)}
                  value={field.value}
                  error={!!errors.second_name?.message}
                  helperText={errors.second_name?.message}
                />
              )}
            />
            <Controller
              name="phone"
              rules={validationTemplate(InputNames.PHONE)}
              control={control}
              render={({ field }) => (
                <TextField
                  type="tel"
                  label="Телефон"
                  id="phone"
                  variant="standard"
                  InputLabelProps={{ shrink: false }}
                  onChange={field.onChange}
                  onInput={() => setIsInputChanged(true)}
                  value={field.value}
                  error={!!errors.phone?.message}
                  helperText={errors.phone?.message}
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
            disabled={!(isValid && isInputChanged)}
          >
            Сохранить
          </Button>
        </form>

        <Link href={ROUTES.profile.path} underline="none">
          <Typography align="center" fontSize="16px" color="text.disabled" fontWeight="bold">
            Сменить пароль
          </Typography>
        </Link>
      </Container>
    </main>
  );
};
