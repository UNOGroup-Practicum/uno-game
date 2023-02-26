import React from "react";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

type InputProps = {
  type: "text" | "tel" | "password" | "email";
  label: string;
  id: string;
  helperText?: string;
  error?: boolean;
  value: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
};

const CssTextField = styled(TextField)({
  "& label": {
    fontSize: 16,
    color: "var(--text-input-field)",
  },

  "& label.Mui-focused": {
    color: "var(--text-input-field)",

    "&.Mui-error": {
      color: "#d32f2f",
    },
  },

  "& .MuiFilledInput-root:before": {
    borderBottom: "1px solid var(--bg-input-border)",
  },

  "& .MuiFilledInput-root:after": {
    borderBottom: "2px solid var(--bg-input-border)",
  },

  "& .MuiInputBase-input": {
    fontSize: 16,
    backgroundColor: "var(--bg-input-field)",
  },

  "& .MuiFormHelperText-root": {
    fontSize: 12,
  },
});

export default function ControlledInput(props: InputProps) {
  return (
    <CssTextField
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
