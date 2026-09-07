import { z } from "zod";

export const loginSchema = z.object({
  phoneNumber: z.string(),
  password: z.string(),
});
