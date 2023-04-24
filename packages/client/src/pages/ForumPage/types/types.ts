export type UserType = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};
export type MessageType = {
  id: number;
  theme_id: number;
  user_id: number;
  user_display_name: string;
  user_avatar: string;
  message: string;
  parent_message_id: number | null;
  createdAt: Date;
};
export type ThemeType = {
  id: number;
  user_id: number;
  title: string;
  createdAt: Date;
};
export type RequestTheme = Omit<ThemeType, "id" | "createdAt">;
