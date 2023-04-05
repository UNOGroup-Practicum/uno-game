import { request } from "./apiRequest";
import { GetTeamLeboardData, UserToLeboardData, UserToLeboardExtData } from "./types";

const teamName = "unoGroup";

export const leaderboardAPI = {
  addUserToLeaderboard: (data: UserToLeboardData) => {
    const extendedData: UserToLeboardExtData = {
      data,
      ratingFieldName: "gamesNumber",
      teamName,
    };
    request.post("leaderboard", extendedData);
  },

  getTeamLeaderboard: (data: GetTeamLeboardData): Promise<UserToLeboardData> => {
    return request.post(`leaderboard/${teamName}`, data);
  },
};
