import React from "react";
import { TextField } from "@mui/material";

type InputProps = {
  type: "text" | "tel" | "password" | "email";
  label: string;
  id: string;
  helperText?: string;
  error?: boolean;
  value?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

export default function ControlledInput(props: InputProps) {
  return (
    <TextField
      variant="filled"
      type={props.type}
      label={props.label}
      id={props.id}
      helperText={props.helperText}
      error={props.error}
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
    />
  );
}
