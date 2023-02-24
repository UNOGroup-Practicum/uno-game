interface Data {
  id: number;
  position: number;
  imgUrl: string;
  name: string;
  games: number;
  wins: number;
  percent: string;
}

export const createData = (
  id: number,
  position: number,
  imgUrl: string,
  name: string,
  games: number,
  wins: number
): Data => {
  const percent = Math.round((wins * 100) / games) + "%";
  return { id, position, imgUrl, name, games, wins, percent };
};
