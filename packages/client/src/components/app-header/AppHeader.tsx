import clsx from "clsx";
import { Container } from "@mui/material";
import { useTheme } from "../../theme/useTheme";
import styles from "./AppHeader.module.scss";

export const AppHeader = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className={clsx("app-header", styles.root)}>
      <Container maxWidth="md">
        <button onClick={toggleTheme}>Переключить тему</button>
        header
      </Container>
    </div>
  );
};
