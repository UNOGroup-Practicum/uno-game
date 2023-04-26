import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import theme from "./models/theme";
import { forum_message, forum_message_reaction, forum_theme } from "./models/forum";

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT, POSTGRES_HOST } = process.env;

const sequelizeOptions: SequelizeOptions = {
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: "postgres", // 'mysql', 'sqlite', 'mariadb', 'mssql'
};

// Создаем инстанс Sequelize
const sequelize = new Sequelize(sequelizeOptions);

// Инициализируем модели
// темизация
export const Theme = sequelize.define("Theme", theme, {});
// форум
export const ForumTheme = sequelize.define("ForumTheme", forum_theme, { updatedAt: false });
export const ForumMessage = sequelize.define("ForumMessage", forum_message, { updatedAt: false });
export const ForumMessageReaction = sequelize.define(
  "ForumMessageReaction",
  forum_message_reaction,
  { timestamps: false }
);

ForumTheme.hasMany(ForumMessage, {
  foreignKey: "theme_id",
  onDelete: "CASCADE",
});
ForumMessage.hasMany(ForumMessageReaction, {
  foreignKey: "message_id",
  onDelete: "CASCADE",
});

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    // TODO: убрать force: true
    await sequelize.sync({ force: true }); // Синхронизация базы данных
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
