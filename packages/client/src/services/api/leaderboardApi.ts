import { request } from "./apiRequest";
import { GetTeamLeboardData, UserToLeboardData, UserToLeboardExtData } from "./types";

export const leaderboardAPI = {
  addUserToLeaderboard: (data: UserToLeboardData) => {
    const extendedData: UserToLeboardExtData = {
      data,
      ratingFieldName: "gamesNumber",
      teamName: "unoGroup",
    };
    request.post("leaderboard", extendedData);
  },

  getTeamLeaderboard: (data: GetTeamLeboardData): Promise<UserToLeboardData> => {
    return request.post("leaderboard/unoGroup", data);
  },
};
