import { DataType } from "sequelize-typescript";

export const forum_theme = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
};

export const forum_message = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  theme_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataType.STRING,
    allowNull: false,
  },
};

export const forum_message_like = {
  id: {
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  message_id: {
    type: DataType.STRING,
    allowNull: false,
  },
  like: {
    type: DataType.STRING,
    allowNull: false,
  },
};
