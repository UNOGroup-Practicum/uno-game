import axios from "axios";

import { RequestMessage, RequestReaction, RequestTheme } from "pages/ForumPage/types/types";

const instance = axios.create({
  baseURL: __API_BASEURL__,
  withCredentials: true,
});

export const forumAPI = {
  // темы
  async getThemes() {
    const response = await instance.get("/forum/themes/");
    return response.data.data;
  },
  async postThemes(data: RequestTheme) {
    const response = await instance.post("/forum/themes/", data);
    return response.data.data;
  },
  async deleteTheme(themeId: number) {
    const response = await instance.delete(`/forum/themes/${themeId}`);
    return response.data.data;
  },
  // сообщения
  async getMessages(themeId: number) {
    const response = await instance.get(`/forum/messages/${themeId}`);
    return response.data.data;
  },
  async postMessage(data: RequestMessage) {
    const response = await instance.post("/forum/messages/", data);
    return response.data.data;
  },
  // реакции
  async getReactions(theme_id: number) {
    const response = await instance.get(`/forum/reactions/${theme_id}`);
    return response.data.data;
  },
  async postReaction(data: RequestReaction) {
    const response = await instance.post("/forum/reactions/", data);
    return response.data.data;
  },
  async deleteReactions(reaction_id: number) {
    const response = await instance.delete(`/forum/reactions/${reaction_id}`);
    return response.data.data;
  },
};
