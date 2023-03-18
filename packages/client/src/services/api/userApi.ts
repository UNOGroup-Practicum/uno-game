import { request } from "./apiRequest";
import { transformUser } from "./transformers";
import { User, UserDTO } from "./types";

export const userAPI = {
  changeUserAvatar: async (data: FormData): Promise<User> => {
    const result = await request.put<UserDTO, FormData>("user/profile/avatar", data);
    return transformUser(result);
  },
};
