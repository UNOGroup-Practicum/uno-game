import { request } from "./apiRequest";
import { ThemeType, TUserRepository, UserDTO } from "./types";

export class APIClientRepository implements TUserRepository {
  async getCurrent(): Promise<UserDTO> {
    return request.get<UserDTO>("auth/user");
  }

  async getForumThemes(): Promise<ThemeType> {
    const response = await request.get<{ data: ThemeType }>("/forum/themes/", {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  }
}
