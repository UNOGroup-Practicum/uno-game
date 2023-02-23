import clsx from "clsx";
import { Container } from "@mui/material";
import styles from "./AppFooter.module.scss";

export const AppFooter = () => {
  return (
    <div className={clsx("app-footer", styles.root)}>
      <Container maxWidth="md">footer</Container>
    </div>
  );
};
