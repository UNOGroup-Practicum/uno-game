import { z } from "zod";

import { RATING_FIELD_NAME } from "../../constants";

import { apiSchema } from "./schema";

export type APIError = {
  reason: string;
  status?: number;
};

export type OAuthServiceRequestData = {
  redirect_uri: string;
};

export type OAuthServiceResponse = {
  service_id: string;
};

export type OAuthLoginRequestData = {
  code: string;
  redirect_uri: string;
};

export type LoginRequestData = {
  login: string;
  password: string;
};

export type PasswordChangeRequest = {
  oldPassword: string;
  newPassword: string;
};

export type RegisterRequestData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type UpdateUserRequestData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type UserDTO = z.infer<typeof apiSchema.UserDTO>;

export type User = {
  id: number;
  login: string;
  firstName: string;
  secondName: string;
  displayName: string;
  avatar: string;
  phone: string;
  email: string;
  fullName: string;
};

export type UserToLeboardData = {
  name: string;
  email: string;
  avatar?: string;
  winsAmount: number;
  [RATING_FIELD_NAME]: number;
};

export type UserToLeboardExtData = {
  data: UserToLeboardData;
  ratingFieldName: string;
  teamName: string;
};

export type GetTeamLeboardData = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type GetTeamLeboardResponse = {
  data: UserToLeboardData;
};

export type LeaderboardUserData = {
  position: number;
  imgUrl: string | undefined;
  name: string;
  games: number;
  wins: number;
  percent: string;
  email: string;
};

export type TUserRepository = {
  getCurrent(): Promise<UserDTO>;
};

export type TUserService = {
  getCurrentUser(): Promise<User>;
};
