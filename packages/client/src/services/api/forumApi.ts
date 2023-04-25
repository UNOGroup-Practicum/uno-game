import axios from "axios";

import { MessageType, RequestMessage, RequestTheme } from "pages/ForumPage/types/types";

const instance = axios.create({
  baseURL: __API_BASEURL__,
  withCredentials: true,
});

export const forumAPI = {
  async getForumThemes() {
    const response = await instance.get("/forum");
    return response.data.data;
  },
  async postForumThemes(data: RequestTheme) {
    const response = await instance.post("/forum/theme/", data);
    return response.data.data;
  },
  async deleteForumTheme(themeId: number) {
    const response = await instance.delete(`/forum/theme/${themeId}`);
    return response.data.data;
  },
  async getForumThemeMessages(themeId: number) {
    const response = await instance.get(`/forum/${themeId}`);
    return response.data.data;
  },
  async postForumThemeMessage(data: RequestMessage) {
    const response = await instance.post("/forum/message/", data);
    return response.data.data;
  },
};
