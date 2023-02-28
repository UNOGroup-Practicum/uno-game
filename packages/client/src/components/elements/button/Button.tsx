import React from "react";
import { Button } from "@mui/material";

type ButtonProps = {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    submit: true;
  }
}

export const ControlledButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="large"
      variant="submit"
      type="submit"
      sx={{
        marginTop: "200px",
      }}
    >
      {text}
    </Button>
  );
};
