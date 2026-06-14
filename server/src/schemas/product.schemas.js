import { z } from "zod";

export const createProductSchema = z.object({
  title: z
    .string()
    .min(3, "The title must be at least 3 characters")
    .max(100, "The title must be at most 100 characters"),
  description: z
    .string()
    .min(10, "The description must be at least 10 characters")
    .max(1000, "The description must be at most 1000 characters"),
  price: z.coerce.number().min(1, "The price must be greater than 0"),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  stock: z.coerce.number().min(1, "The stock must be greater than 0"),
});

export const updateProductSchema = createProductSchema.partial();
