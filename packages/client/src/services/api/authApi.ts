import { APIError, LoginRequestData, User, UserDTO } from "./types";
import { request, apiHasError } from "./apiRequest";
import { transformUser } from "./transformers";

export const authAPI = {
  login: (data: LoginRequestData): Promise<"OK" | APIError> =>
    request.post<"OK", LoginRequestData>("auth/signin", data),

  me: async (): Promise<User | APIError> => {
    const result = await request.get<UserDTO>("auth/user");

    return apiHasError(result) ? result : transformUser(result);
  },

  logout: (): Promise<"OK" | APIError> => request.post<"OK", null>("auth/logout"),
};
