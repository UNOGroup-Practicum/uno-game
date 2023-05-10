import { request } from "./apiRequest";
import {
  MessageType,
  ReactionsType,
  RequestMessage,
  RequestReaction,
  RequestTheme,
  ThemeType,
} from "./types";

export const forumAPI = {
  // темы
  async getThemes() {
    const response = await request.get<{ data: ThemeType[] }>("/forum/themes/", {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async postThemes(data: RequestTheme) {
    const response = await request.post<{ data: ThemeType[] }, unknown>("/forum/themes/", data, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async deleteTheme(themeId: number) {
    const response = await request.delete<{ data: ThemeType[] }>(`/forum/themes/${themeId}`, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  // сообщения
  async getMessages(themeId: number) {
    const response = await request.get<{
      data: { messages: MessageType[]; reactions: ReactionsType[] };
    }>(`/forum/messages/${themeId}`, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async postMessage(data: RequestMessage) {
    const response = await request.post<{ data: MessageType[] }, unknown>(
      "/forum/messages/",
      data,
      {
        baseURL: __API_BASEURL__,
      }
    );

    return response.data;
  },
  // реакции
  async getReactions(theme_id: number) {
    const response = await request.get<{ data: ReactionsType[] }>(`/forum/reactions/${theme_id}`, {
      baseURL: __API_BASEURL__,
    });

    return response.data;
  },
  async postReaction(data: RequestReaction) {
    const response = await request.post<{ data: ReactionsType[] }, unknown>(
      "/forum/reactions/",
      data,
      {
        baseURL: __API_BASEURL__,
      }
    );

    return response.data;
  },
  async deleteReactions(reaction_id: number) {
    const response = await request.delete<{ data: ReactionsType[] }>(
      `/forum/reactions/${reaction_id}`,
      {
        baseURL: __API_BASEURL__,
      }
    );

    return response.data;
  },
};
