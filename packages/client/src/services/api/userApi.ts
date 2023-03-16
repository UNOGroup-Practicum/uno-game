import { request } from "./apiRequest";
import { UserDTO } from "./types";

export const userAPI = {
  changeUserAvatar: (data: FormData): Promise<UserDTO> =>
    request.put<UserDTO, FormData>("user/profile/avatar", data),
};
