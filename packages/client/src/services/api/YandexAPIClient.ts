import { request } from "./apiRequest";
import { TUserRepository, UserDTO } from "./types";

export class YandexAPIClient implements TUserRepository {
  async getCurrent(): Promise<UserDTO> {
    return request.get<UserDTO>("auth/user");
  }
}
