import { Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import styles from "./LiderboardPage.module.scss";

import { LeaderboardProfile } from "../../components/leaderboard-profile/LeaderbordProfile";

export const LiderboardPage = () => {
  const handleFilter = (e: React.MouseEvent<HTMLElement>): void => {
    console.log(e);
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="md">
        <h1 className={styles.leaderboard__headline}>Список лидеров</h1>
        <Stack spacing={3} direction="row" sx={{ margin: "20px 0", display: "inline-block" }}>
          <Button variant="contained" className={styles.leaderboard__btn} onClick={handleFilter}>
            Неделя
          </Button>
          <Button variant="contained" className={styles.leaderboard__btn} onClick={handleFilter}>
            Месяц
          </Button>
          <Button variant="contained" className={styles.leaderboard__btn} onClick={handleFilter}>
            За всё время
          </Button>
        </Stack>
        <LeaderboardProfile />
      </Container>
    </div>
  );
};
