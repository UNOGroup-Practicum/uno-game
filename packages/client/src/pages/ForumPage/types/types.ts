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
  messageId: number;
  messageCreatorUser: Pick<UserType, "id" | "display_name" | "avatar">;
  messageText: string;
  messageCreationDate: Date;
};
export type ThemeType = {
  themeId: number;
  themeCreatorUser: Pick<UserType, "id" | "display_name" | "avatar">;
  themeTitle: string;
  themeCreationDate: Date;
  themeMessages: MessageType[];
};
