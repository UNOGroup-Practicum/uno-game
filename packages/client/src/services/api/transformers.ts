import { User, UserDTO } from "./types";

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name || "",
    avatar: data.avatar || "",
    phone: data.phone || "",
    email: data.email,
    fullName: `${data.first_name} ${data.second_name}`,
  };
};

export const transformUsers = (data: UserDTO[]): User[] => {
  return data.map((user) => transformUser(user));
};
