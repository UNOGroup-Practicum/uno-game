import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import theme from "./models/theme";

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
export const Theme = sequelize.define("Theme", theme, {});

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
