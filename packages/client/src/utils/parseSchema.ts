import { z } from "zod";

import { SCHEMA_ERROR_MESSAGE } from "../constants";

export const parseSchema = (schema: ReturnType<typeof z.object>, data: unknown) => {
  try {
    const result = schema.parse(data);

    return result;
  } catch {
    throw new Error(SCHEMA_ERROR_MESSAGE);
  }
};
