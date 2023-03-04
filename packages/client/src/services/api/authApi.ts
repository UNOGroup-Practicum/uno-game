import { LoginRequestData, User, UserDTO } from "./types";
import { request } from "./apiRequest";
import { transformUser } from "./transformers";

export const authAPI = {
  login: (data: LoginRequestData): Promise<"OK"> =>
    request.post<"OK", LoginRequestData>("auth/signin", data),

  me: async (): Promise<User> => {
    const result = await request.get<UserDTO>("auth/users");

    return transformUser(result);
  },

  logout: (): Promise<"OK"> => request.post<"OK", null>("auth/logout"),
};