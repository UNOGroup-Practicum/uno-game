import CloseIcon from "@mui/icons-material/Close";
import { Dialog, DialogContent, IconButton } from "@mui/material";

import React, { ReactNode } from "react";

import styles from "./ModalForm.module.scss";

export type TModalForm = {
  onClick: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

export const ModalForm: React.FC<TModalForm> = (props: TModalForm) => {
  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClick}
      classes={{
        container: styles.modalForm__container,
        paper: styles.modalForm__paper,
      }}
    >
      <IconButton
        aria-label="close"
        onClick={props.onClick}
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
        {props.children}
      </DialogContent>
    </Dialog>
  );
};
