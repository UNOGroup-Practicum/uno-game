import { RATING_FIELD_NAME } from "../../constants";

import { request } from "./apiRequest";
import {
  GetTeamLeboardData,
  GetTeamLeboardResponse,
  UserToLeboardData,
  UserToLeboardExtData,
} from "./types";

const teamName = "unoGroup";

export const leaderboardAPI = {
  addUserToLeaderboard: (data: UserToLeboardData) => {
    const extendedData: UserToLeboardExtData = {
      data,
      ratingFieldName: RATING_FIELD_NAME,
      teamName,
    };
    return request.post("leaderboard", extendedData);
  },

  getTeamLeaderboard: (data: GetTeamLeboardData): Promise<GetTeamLeboardResponse[]> => {
    return request.post(`leaderboard/${teamName}`, data);
  },

  getTeamLeaderboardAll: (data: GetTeamLeboardData): Promise<GetTeamLeboardResponse[]> => {
    return request.post("leaderboard/all", data);
  },
};
