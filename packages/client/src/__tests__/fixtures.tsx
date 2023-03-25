import React from "react";

import { UserDTO } from "services/api/types";

export const mainUser: UserDTO = {
  id: 3094,
  login: "vasya",
  email: "vasya@vasya.ru",
  first_name: "Вася",
  second_name: "Василек",
  display_name: "Вася Василек",
  phone: "89137909090",
  avatar: "/d66cf98f-05dc-49ba-8d2b-c1db0c5888c3/761d694b-39b5-4dee-ab15-78a2bf05461d_12.png",
};

export const ValidComponent: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div data-testid="valid-component">
    <p>Valid component</p>
    {children}
  </div>
);

export const InValidComponent = () => {
  const error = new Error("test error");

  return error;
};
