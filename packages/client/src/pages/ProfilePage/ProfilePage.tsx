import { Container } from "@mui/material";
import styles from "./ProfilePage.module.scss";

export const ProfilePage = () => {
  return (
    <div className={styles.root}>
      <Container maxWidth="md">Вот тут будет жить ваше приложение :)</Container>
    </div>
  );
};
