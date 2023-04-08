import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import clsx from "clsx";

import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { UpdateUserRequestData } from "services/api/types";
import { useDispatch } from "services/hooks";
import { authSelect } from "services/slices/auth-slice";
import { userSelect, userSlice, userThunks } from "services/slices/user-slice";
import { InputNames, validationTemplate } from "utils/validation/validation";

import { PasswordChangeForm } from "components/password-change-form/PasswordChangeForm";

import { ROUTES } from "../../constants";

import styles from "./ProfilePage.module.scss";

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();

  const { error, isLoading, isSuccess } = useSelector(userSelect);

  const [isInputChanged, setIsInputChanged] = useState(false);
  const [isChangedPassword, setIsChangedPassword] = useState(false);

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
    if (error.avatar || error.profile) {
      setTimeout(() => {
        dispatch(userSlice.actions.resetError());
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess.profile) {
      setTimeout(() => {
        dispatch(userSlice.actions.resetIsSuccess());
      }, 3000);
    }
  }, [isSuccess]);

  const onChangeAvatar = async (event: React.FormEvent<HTMLInputElement>) => {
    const eventTargetFiles = event.currentTarget.files;

    if (eventTargetFiles?.length === 1) {
      const newAvatar = eventTargetFiles[0];

      const formData = new FormData();
      formData.append("avatar", newAvatar);

      dispatch(userThunks.changeUserAvatar(formData));
    }
  };

  const onChangeProfile: SubmitHandler<UpdateUserRequestData> = (formData) => {
    dispatch(userThunks.changeUserProfile(formData));
  };

  const onOpenFormChangePassword = () => {
    setIsChangedPassword(!isChangedPassword);
  };

  return (
    <main className={styles.profile} data-testid="page-profile">
      <Container maxWidth="md">
        <section
          className={clsx(
            styles.profile__photo,
            styles.profile_show,
            isChangedPassword && styles.profile_hide
          )}
        >
          <Avatar
            src={`${__API_ENDPOINT__}/resources${user?.avatar}`}
            sx={{ width: 100, height: 100 }}
          />
          <div className={styles.profile__photo_edit}>
            <input
              className={styles.profile__photo_edit_input}
              type="file"
              accept=".jpg, .jpeg, .png"
              name="avatar"
              onInput={onChangeAvatar}
              disabled={isLoading.avatar || !!error.avatar}
              title=""
            />
            {!isLoading.avatar && <EditIcon className={styles.profile__photo_edit_img} />}
          </div>
          {isLoading.avatar && <div className={styles.profile__photo_loading}>загрузка...</div>}
          {error.avatar && (
            <Box mt={2} textAlign={"center"} color={"error.light"}>
              {error.avatar}
            </Box>
          )}
        </section>
        <form
          name="profile-form"
          className={clsx(
            styles.profile__form,
            styles.profile_show,
            isChangedPassword && styles.profile_hide
          )}
          onSubmit={handleSubmit(onChangeProfile)}
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
                  value={field.value}
                  InputLabelProps={{ shrink: false }}
                  onChange={field.onChange}
                  onInput={() => setIsInputChanged(true)}
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

          {isLoading.profile && (
            <Box mt={2} textAlign={"center"}>
              загрузка...
            </Box>
          )}
          {isSuccess.profile && (
            <Box mt={2} textAlign={"center"}>
              Данные успешно обновлены!
            </Box>
          )}
          {error.profile && (
            <Box mt={2} textAlign={"center"} color={"error.light"}>
              {error.profile}
            </Box>
          )}

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

        <Link
          href={ROUTES.profile.path}
          underline="none"
          className={clsx(styles.profile_show, isChangedPassword && styles.profile_hide)}
        >
          <Typography
            align="center"
            fontSize="16px"
            color="text.disabled"
            fontWeight="bold"
            onClick={onOpenFormChangePassword}
          >
            Сменить пароль
          </Typography>
        </Link>

        <Dialog
          open={isChangedPassword}
          onClose={onOpenFormChangePassword}
          classes={{
            container: styles.modalForm__container,
            paper: styles.modalForm__paper,
          }}
        >
          <IconButton
            aria-label="close"
            onClick={onOpenFormChangePassword}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            classes={{
              root: styles.modalForm__dialogContent,
            }}
          >
            <PasswordChangeForm
              formClassName={styles.profile__form}
              isChangedPassword={isChangedPassword}
              setIsChangedPassword={setIsChangedPassword}
            />
          </DialogContent>
        </Dialog>
      </Container>
    </main>
  );
};
