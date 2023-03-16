import { request } from "./apiRequest";

export const userAPI = {
  changeUserAvatar: (data: FormData): Promise<"OK"> =>
    request.put<"OK", FormData>("user/profile/avatar", data),
};
