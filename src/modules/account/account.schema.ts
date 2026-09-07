import { z } from "zod";
import { CurrencyEnum } from "../transaction/transaction.constants";
export const accountSchema = z.object({
  id: z.string(),
  currency: z.enum(CurrencyEnum),
  userId: z.string(),
});
