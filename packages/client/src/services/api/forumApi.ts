// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
// TODO: удалить @ts-nocheck

import { RequestMessage, RequestReaction, RequestTheme } from "pages/ForumPage/types/types";

import { request } from "./apiRequest";

// TODO: добавить типы
export const forumAPI = {
  // темы
  async getThemes() {
    const response = await request.get("/forum/themes/", {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async postThemes(data: RequestTheme) {
    const response = await request.post("/forum/themes/", data, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async deleteTheme(themeId: number) {
    const response = await request.delete(`/forum/themes/${themeId}`, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  // сообщения
  async getMessages(themeId: number) {
    const response = await request.get(`/forum/messages/${themeId}`, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async postMessage(data: RequestMessage) {
    const response = await request.post("/forum/messages/", data, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  // реакции
  async getReactions(theme_id: number) {
    const response = await request.get(`/forum/reactions/${theme_id}`, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async postReaction(data: RequestReaction) {
    const response = await request.post("/forum/reactions/", data, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async deleteReactions(reaction_id: number) {
    const response = await request.delete(`/forum/reactions/${reaction_id}`, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
};
