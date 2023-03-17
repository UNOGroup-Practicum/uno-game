import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Container, Link, Stack, TextField, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { UpdateUserRequestData } from "services/api/types";
import { useDispatch } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { userSelect, userSlice, userThunks } from "services/slices/user-slice";
import { InputNames, validationTemplate } from "utils/validation/validation";

import { ROUTES } from "../../constants";

import styles from "./ProfilePage.module.scss";

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();

  const { error, isLoading } = useSelector(userSelect);

  const [isInputChanged, setIsInputChanged] = useState(false);

  const { user } = useSelector(authSelect);

  const transformedUser: UpdateUserRequestData = {
    login: user?.login || "",
    first_name: user?.firstName || "",
    second_name: user?.secondName || "",
    display_name: user?.displayName || "",
    phone: user?.phone || "",
    email: user?.email || "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...transformedUser,
    },
    mode: "onChange",
  });

  useEffect(() => {
    reset(transformedUser);
  }, [user]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(userSlice.actions.resetError());
      }, 2000);
    }
  }, [error]);

  const onChangeAvatar = async (event: React.FormEvent<HTMLInputElement>) => {
    const eventTargetFiles = event.currentTarget.files;

    if (eventTargetFiles?.length === 1) {
      const newAvatar = eventTargetFiles[0];

      const formData = new FormData();
      formData.append("avatar", newAvatar);

      dispatch(userThunks.changeUserAvatar(formData));
    }
  };

  const onSubmit: SubmitHandler<UpdateUserRequestData> = (data) => {
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
              disabled={isLoading || !!error}
              title=""
            />
            {!isLoading && <EditIcon className={styles.profile__photo_edit_img} />}
          </div>
          {isLoading && <div className={styles.profile__photo_loading}>загрузка...</div>}
          {error && (
            <Box mt={2} textAlign={"center"} color={"error.light"}>
              {error}
            </Box>
          )}
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
