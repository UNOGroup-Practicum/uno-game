import { z } from "zod";

import { apiSchema } from "./schema";

export type APIError = {
  reason: string;
  status?: number;
};

export type LoginRequestData = {
  login: string;
  password: string;
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
  avatar?: string;
  winsNumber: number;
  gamesNumber: number;
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
