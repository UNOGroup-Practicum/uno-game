import axios from "axios";

import { RequestTheme } from "pages/ForumPage/types/types";

const instance = axios.create({
  baseURL: __API_BASEURL__,
  withCredentials: true,
});

export const forumAPI = {
  async getForumThemes() {
    const response = await instance.get("/forum");
    return response.data.data;
  },
  async putForumThemes(data: RequestTheme) {
    const response = await instance.put("/forum", data);
    return response.data.data;
  },
  async deleteForumThemeById(themeId: number) {
    const response = await instance.delete(`/forum/${themeId}`);
    return response.data.data;
  },
  async getForumThemeMessagesById(themeId: number) {
    const response = await instance.get(`/forum/${themeId}`);
    return response.data.data;
  },
};
