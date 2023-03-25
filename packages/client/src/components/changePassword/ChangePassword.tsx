import { Box, Button, Stack, TextField } from "@mui/material";
import { clsx } from "clsx";

import React, { useRef, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { UpdateUserPassword } from "../../services/api/types";
import {
  ERROR_MESSAGE,
  InputNames,
  REQUIRED_MESSAGE,
  validationTemplate,
} from "../../utils/validation/validation";

import { ButtonCrossClose } from "./buttonCloseCross/ButtonCrossClose";

import styles from "./ChangePassword.module.scss";

type Props = {
  onClick: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChangePassword: React.FC<Props> = (props: Props) => {
  const updatedUserPassword = {
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      ...updatedUserPassword,
    },
    mode: "onChange",
  });

  const passwordNewRef = useRef<HTMLInputElement>();

  const [isPasswordSend, setIsPasswordSend] = useState(false);

  const onSubmitChangePassword: SubmitHandler<UpdateUserPassword> = (formData) => {
    const { oldPassword, newPassword } = formData;
    setIsPasswordSend(!isPasswordSend);

    setTimeout(() => {
      if (props.isOpen) {
        props.setIsOpen(!props.isOpen);
      }
    }, 2000);

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
    <div className={clsx(styles.changePassword, props.isOpen && styles.changePassword_show)}>
      <div
        className={clsx(
          styles.changePassword__wrapper,
          props.isOpen && styles.changePassword__wrapper_show
        )}
      >
        <ButtonCrossClose onClick={props.onClick} />
        <form
          name="changePassword-form"
          key="changePassword-form"
          className={styles.changePassword__form}
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
                  onChange={field.onChange}
                  value={field.value || ""}
                  error={!!errors.confirmPassword?.message}
                  helperText={errors.confirmPassword?.message}
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
              marginTop: "150px",
              marginBottom: "10px",
            }}
            disabled={!isValid}
          >
            Сохранить
          </Button>

          {isPasswordSend && (
            <Box mt={2} textAlign={"center"}>
              Пароль успешно изменен
            </Box>
          )}
        </form>
      </div>
    </div>
  );
};
