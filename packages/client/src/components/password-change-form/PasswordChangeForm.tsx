import { Box, Button, Stack, TextField } from "@mui/material";

import { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { PasswordChangeRequest } from "services/api/types";
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

export const PasswordChangeForm = (props: TProps) => {
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

  const [isPasswordSend, setIsPasswordSend] = useState(false);

  const passwordNewRef = useRef<HTMLInputElement>();

  const onSubmitChangePassword: SubmitHandler<PasswordChangeRequest> = (formData) => {
    const { oldPassword, newPassword } = formData;
    setIsPasswordSend(!isPasswordSend);

    setTimeout(() => {
      if (props.isChangedPassword) {
        props.setIsChangedPassword(!props.isChangedPassword);
      }
      reset(passwordChangeData);
    }, 3000);

    console.log(
      JSON.stringify(
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        null,
        2
      )
    );
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

      {isPasswordSend && (
        <Box
          textAlign={"center"}
          sx={{
            marginTop: 3,
          }}
        >
          Пароль успешно изменен
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
