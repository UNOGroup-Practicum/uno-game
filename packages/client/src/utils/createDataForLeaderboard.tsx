import { LeaderboardUserData } from "services/api/types";

export const createData = (
  id: number,
  position: number,
  imgUrl: string | undefined,
  name: string,
  games: number,
  wins: number
): LeaderboardUserData => {
  const percent = Math.round((wins * 100) / games) + "%";
  return { id, position, imgUrl, name, games, wins, percent };
};
