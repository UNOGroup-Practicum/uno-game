import { Container } from "@mui/material";
import styles from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="md">Вот тут будет жить ваше приложение :)</Container>
    </div>
  );
};
