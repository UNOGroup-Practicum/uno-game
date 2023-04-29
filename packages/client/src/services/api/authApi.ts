import { parseSchema } from "utils/parseSchema";

import { request } from "./apiRequest";
import { apiSchema } from "./schema";
import { transformUser } from "./transformers";
import { LoginRequestData, RegisterRequestData, User, UserDTO } from "./types";

export const authAPI = {
  login: (data: LoginRequestData): Promise<"OK"> =>
    request.post<"OK", LoginRequestData>("auth/signin", data),

  me: async (): Promise<User> => {
    const result = await request.get<UserDTO>("auth/user");

    parseSchema(apiSchema.UserDTO, result);

    return transformUser(result);
  },

  logout: (): Promise<"OK"> => request.post<"OK", null>("auth/logout"),

  register: (data: RegisterRequestData): Promise<"OK"> =>
    request.post<"OK", LoginRequestData>("auth/signup", data),
};
