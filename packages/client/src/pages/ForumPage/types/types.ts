export type ThemeType = {
  id: number;
  user_id: number;
  title: string;
  createdAt: Date;
};
export type MessageType = {
  id: number;
  theme_id: number;
  user_id: number;
  user_display_name: string;
  user_avatar: string;
  message: string;
  parent_message_id: number | null;
  parent_message_text: string | null;
  createdAt: Date;
};
export type ReactionsType = {
  id: number;
  theme_id: number;
  message_id: number;
  user_id: number;
  reaction: string;
  createdAt: Date;
};
export type RequestTheme = Omit<ThemeType, "id" | "createdAt">;
export type RequestMessage = Omit<MessageType, "id" | "createdAt">;
export type RequestReaction = Omit<ReactionsType, "id" | "createdAt">;

export type ForumState = {
  isLoading: boolean;
  error: string | null;
  isSuccess: boolean;
  themes: ThemeType[];
  currentMessages: MessageType[];
  currentReactions: ReactionsType[];
};
