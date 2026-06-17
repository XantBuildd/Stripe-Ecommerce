import { z } from "zod";

export const createItemSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1, "Quantity must be greater than 0"),
});
