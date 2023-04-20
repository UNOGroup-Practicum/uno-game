import { LeaderboardUserData } from "services/api/types";

export const createData = (
  position: number,
  imgUrl: string | undefined,
  name: string,
  games: number,
  wins: number
): LeaderboardUserData => {
  const percent = Math.round((wins * 100) / games) + "%";
  return { position, imgUrl, name, games, wins, percent };
};
