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
  user_display_name: {
    type: DataType.STRING,
    allowNull: false,
  },
  user_avatar: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  },
  user_id: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  message: {
    type: DataType.STRING,
    allowNull: false,
  },
  parent_message_id: {
    type: DataType.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
  parent_message_text: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  },
};
export const forum_message_reaction = {
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
  reaction: {
    type: DataType.STRING,
    allowNull: false,
    defaultValue: "like",
  },
};
