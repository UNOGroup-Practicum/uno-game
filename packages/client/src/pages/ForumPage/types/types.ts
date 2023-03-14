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
  messageCreatorUser: UserType;
  messageText: string;
  messageCreationDate: Date;
};
export type ThemeType = {
  themeId: number;
  themeCreatorUser: UserType;
  themeTitle: string;
  themeCreationDate: Date;
  themeMessages: MessageType[];
};
