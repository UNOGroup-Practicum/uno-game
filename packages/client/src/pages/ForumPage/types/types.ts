export type UserType = {
  id: number;
  login?: string;
  firstName?: string;
  secondName?: string;
  displayName: string;
  avatar: string;
  phone?: string;
  email?: string;
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
