import { z } from "zod";

const UserDTO = z.object({
  id: z.number(),
  login: z.string(),
  first_name: z.string(),
  second_name: z.string(),
  display_name: z.string(),
  avatar: z.string(),
  phone: z.string(),
  email: z.string(),
});

export const apiSchema = { UserDTO };
