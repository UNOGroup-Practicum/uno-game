import { Container } from "@mui/material";
import { Button, Stack, Typography } from "@mui/material";

import { useEffect, useState } from "react";

import { UserToLeboardData } from "services/api/types";

import { LeaderboardProfile } from "components/leaderboard-profile/LeaderbordProfile";

import { leaderboardAPI } from "../../services/api/leaderboardApi";

import styles from "./LiderboardPage.module.scss";

export const LiderboardPage = () => {
  const [results, setResults] = useState<UserToLeboardData[]>([]);

  useEffect(() => {
    leaderboardAPI
      .getTeamLeaderboardAll({
        ratingFieldName: "winsNumber",
        cursor: 0,
        limit: 100,
      })
      .then((res) => setResults(() => res.map((el) => el.data)))
      .catch((err) => console.log(err));
  }, []);

  const handleFilter = (e: React.MouseEvent<HTMLElement>): void => {
    console.log(e);
  };

  return (
    <div className={styles.root} data-testid="page-leaderboard">
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" align="center" marginBottom={3}>
          Список лидеров
        </Typography>
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
        <LeaderboardProfile gameResults={results} />
      </Container>
    </div>
  );
};
