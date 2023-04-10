import { Box, Button, Stack, TextField } from "@mui/material";

import { useEffect, useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useDispatch } from "services/hooks";
import { userSelect, userSlice, userThunks } from "services/slices/user-slice";
import {
  ERROR_MESSAGE,
  InputNames,
  REQUIRED_MESSAGE,
  validationTemplate,
} from "utils/validation/validation";

type TProps = {
  formClassName: string;
  isChangedPassword: boolean;
  setIsChangedPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

type TFormProps = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const PasswordChangeForm = (props: TProps) => {
  const interval = 3000;

  const passwordChangeData = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...passwordChangeData,
    },
    mode: "onChange",
  });

  const dispatch = useDispatch();

  const { error, isLoading, isSuccess } = useSelector(userSelect);

  const passwordNewRef = useRef<HTMLInputElement>();

  useEffect(() => {
    if (error.password) {
      setTimeout(() => {
        dispatch(userSlice.actions.resetError());
      }, interval);
    }
  }, [error]);

  useEffect(() => {
    if (isSuccess.password) {
      setTimeout(() => {
        dispatch(userSlice.actions.resetIsSuccess());

        if (props.isChangedPassword) {
          props.setIsChangedPassword(!props.isChangedPassword);
        }

        reset(passwordChangeData);
      }, interval);
    }
  }, [isSuccess]);

  const onSubmitChangePassword: SubmitHandler<TFormProps> = (formData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword, ...sendData } = formData;

    dispatch(userThunks.changeUserPassword(sendData));
  };

  return (
    <form
      className={props.formClassName}
      name="changePassword-form"
      key="changePassword-form"
      onSubmit={handleSubmit(onSubmitChangePassword)}
      noValidate
    >
      <Stack spacing={3}>
        <Controller
          control={control}
          key="oldPassword"
          name="oldPassword"
          rules={{ required: REQUIRED_MESSAGE }}
          render={({ field }) => (
            <TextField
              variant="standard"
              label="Старый пароль"
              type="password"
              id="oldPassword"
              InputLabelProps={{ shrink: false }}
              onChange={field.onChange}
              value={field.value || ""}
              error={!!errors.oldPassword?.message}
              helperText={errors.oldPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="newPassword"
          key="newPassword"
          rules={validationTemplate(InputNames.PASSWORD)}
          render={({ field }) => (
            <TextField
              variant="standard"
              label="Новый пароль"
              type="password"
              id="newPassword"
              InputLabelProps={{ shrink: false }}
              inputRef={passwordNewRef}
              onChange={field.onChange}
              value={field.value || ""}
              error={!!errors.newPassword?.message}
              helperText={errors.newPassword?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="confirmPassword"
          key="confirmPassword"
          rules={{
            required: REQUIRED_MESSAGE,
            validate: (value: string) => {
              if (value !== passwordNewRef.current?.value) {
                return ERROR_MESSAGE.CONFIRM_PASSWORD;
              }

              return true;
            },
          }}
          render={({ field }) => (
            <TextField
              variant="standard"
              label="Подтвердите новый пароль"
              type="password"
              id="confirmPassword"
              InputLabelProps={{ shrink: false }}
              onChange={field.onChange}
              value={field.value || ""}
              error={!!errors.confirmPassword?.message}
              helperText={errors.confirmPassword?.message}
            />
          )}
        />
      </Stack>

      {isLoading.password && (
        <Box mt={2} textAlign={"center"}>
          загрузка...
        </Box>
      )}
      {isSuccess.password && (
        <Box mt={2} textAlign={"center"}>
          Пароль успешно обновлён!
        </Box>
      )}
      {error.password && (
        <Box mt={2} textAlign={"center"} color={"error.light"}>
          {error.password}
        </Box>
      )}

      <Button
        fullWidth={true}
        size="large"
        type="submit"
        variant="contained"
        color="warning"
        disabled={!isValid}
        sx={{
          marginTop: "100px",
        }}
      >
        Сохранить
      </Button>
    </form>
  );
};
