import React from "react";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

type ButtonProps = {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

const CssButton = styled(Button)({
  "&": {
    fontSize: 14,
    padding: "16px 14px",
    borderRadius: 15,
    backgroundColor: "var(--primary-color)",
    color: "white",
    width: "100%",
    marginTop: 200,
  },
});

const ControlledButton: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <CssButton variant="contained" onClick={onClick}>
      {text}
    </CssButton>
  );
};

export default ControlledButton;
