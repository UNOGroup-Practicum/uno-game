import { request } from "./apiRequest";
import { TUserRepository, UserDTO } from "./types";

export class APIClientRepository implements TUserRepository {
  async getCurrent(): Promise<UserDTO> {
    return request.get<UserDTO>("auth/user");
  }

  // TODO: добавить типы
  async getForumThemes() {
    const response = await request.get("/forum/themes/", {
      baseURL: __API_BASEURL__,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return response.data;
  }
}
