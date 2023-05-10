import { parseSchema } from "utils/parseSchema";

import { apiSchema } from "./schema";
import { transformUser } from "./transformers";
import { TUserRepository } from "./types";

export class UserService {
  constructor(private _repo: TUserRepository) {}

  async getCurrentUser() {
    const result = await this._repo.getCurrent();

    parseSchema(apiSchema.UserDTO, result);

    return transformUser(result);
  }

  async getForumThemes() {
    return this._repo.getForumThemes();
  }
}
