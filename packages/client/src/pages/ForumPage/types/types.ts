export type UserType = {
  userId: number;
  username: string;
  avatar: string;
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
