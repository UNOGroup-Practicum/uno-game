import { DataType } from "sequelize-typescript";

const theme = {
  themeUID: {
    type: DataType.STRING,
    allowNull: false,
  },
  theme: {
    type: DataType.ENUM("dark", "light"),
    allowNull: false,
  },
};

export default theme;
