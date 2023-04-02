import { Container } from "@mui/material";
import { Button, Stack, Typography } from "@mui/material";

import { LeaderboardProfile } from "components/leaderboard-profile/LeaderbordProfile";

import styles from "./LiderboardPage.module.scss";

export const LiderboardPage = () => {
  return (
    <div className={styles.root} data-testid="page-leaderboard">
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" marginBottom={3}>
          Список лидеров
        </Typography>
        <Stack spacing={3} direction="row" sx={{ margin: "20px 0", display: "inline-block" }}>
          <Button variant="contained" className={styles.leaderboard__btn}>
            Неделя
          </Button>
          <Button variant="contained" className={styles.leaderboard__btn}>
            Месяц
          </Button>
          <Button variant="contained" className={styles.leaderboard__btn}>
            За всё время
          </Button>
        </Stack>
        <LeaderboardProfile />
      </Container>
    </div>
  );
};
