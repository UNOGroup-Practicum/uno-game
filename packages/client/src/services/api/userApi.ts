import { parseSchema } from "utils/parseSchema";

import { request } from "./apiRequest";
import { apiSchema } from "./schema";
import { transformUser } from "./transformers";
import { UpdateUserRequestData, User, UserDTO } from "./types";

export const userAPI = {
  changeUserAvatar: async (data: FormData): Promise<User> => {
    const result = await request.put<UserDTO, FormData>("user/profile/avatar", data);

    parseSchema(apiSchema.UserDTO, result);

    return transformUser(result);
  },
  changeUserProfile: async (data: UpdateUserRequestData): Promise<User> => {
    const result = await request.put<UserDTO, UpdateUserRequestData>("user/profile", data);

    parseSchema(apiSchema.UserDTO, result);

    return transformUser(result);
  },
};
