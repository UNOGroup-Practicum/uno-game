import { ThemeType, UserType } from "../types/types";

export const forumData: ThemeType[] = [
  {
    themeId: 1,
    themeCreatorUser: {
      userId: 1,
      username: "Евгений",
      avatar:
        "https://banner2.cleanpng.com/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
    },
    themeTitle: "Вопросы разработчикам",
    themeCreationDate: new Date("2023-02-22"),
    themeMessages: [
      {
        messageId: 1,
        messageCreatorUser: {
          userId: 1,
          username: "Евгений",
          avatar:
            "https://banner2.cleanpng.com/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
        },
        messageText:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet assumenda doloremque maxime placeat possimus sapiente sunt ut vitae voluptatum.",
        messageCreationDate: new Date("2023-02-23"),
      },
      {
        messageId: 2,
        messageCreatorUser: {
          userId: 2,
          username: "Пётр",
          avatar:
            "https://cdn2.vectorstock.com/i/1000x1000/95/11/man-with-glasses-avatar-simple-icon-vector-6759511.jpg",
        },
        messageText:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet assumenda doloremque maxime placeat possimus sapiente sunt ut vitae voluptatum.",
        messageCreationDate: new Date("2023-02-24"),
      },
    ],
  },
  {
    themeId: 2,
    themeCreatorUser: {
      userId: 2,
      username: "Пётр",
      avatar:
        "https://cdn2.vectorstock.com/i/1000x1000/95/11/man-with-glasses-avatar-simple-icon-vector-6759511.jpg",
    },
    themeTitle: "Правила игры",
    themeCreationDate: new Date("2023-02-22"),
    themeMessages: [
      {
        messageId: 1,
        messageCreatorUser: {
          userId: 1,
          username: "Евгений",
          avatar:
            "https://banner2.cleanpng.com/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
        },
        messageText:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet assumenda doloremque maxime placeat possimus sapiente sunt ut vitae voluptatum.",
        messageCreationDate: new Date("2023-02-23"),
      },
      {
        messageId: 2,
        messageCreatorUser: {
          userId: 2,
          username: "Пётр",
          avatar:
            "https://cdn2.vectorstock.com/i/1000x1000/95/11/man-with-glasses-avatar-simple-icon-vector-6759511.jpg",
        },
        messageText:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet assumenda doloremque maxime placeat possimus sapiente sunt ut vitae voluptatum.",
        messageCreationDate: new Date("2023-02-24"),
      },
      {
        messageId: 3,
        messageCreatorUser: {
          userId: 1,
          username: "Евгений",
          avatar:
            "https://banner2.cleanpng.com/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
        },
        messageText:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias, amet assumenda doloremque maxime placeat possimus sapiente sunt ut vitae voluptatum.",
        messageCreationDate: new Date("2023-02-25"),
      },
    ],
  },
];

export const currentUserData: UserType = {
  userId: 1,
  username: "Евгений",
  avatar:
    "https://banner2.cleanpng.com/20180717/cz/kisspng-avatar-youtube-person-kahoot-a-roommate-who-plays-with-a-cell-phone-5b4d74010dd214.7783760115318026250566.jpg",
};