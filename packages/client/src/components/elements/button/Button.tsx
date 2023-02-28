import React from "react";
import { Button, SxProps } from "@mui/material";

type ButtonProps = {
  text: string;
  style?: SxProps;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    submit: true;
  }
}

export const ControlledButton: React.FC<ButtonProps> = ({ text, onClick, style }) => {
  return (
    <Button onClick={onClick} size="large" variant="submit" type="submit" sx={style}>
      {text}
    </Button>
  );
};
