import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import {
  getCart,
  createItemCart,
  updateItemCart,
  deleteItemCart,
  clearCart,
} from "../controllers/cart.controllers.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import { createItemSchema } from "../schemas/cart.schemas.js";

const router = Router();

router.get("/cart", validateToken, getCart);

router.post(
  "/cart",
  validateToken,
  validateSchema(createItemSchema),
  createItemCart,
);

router.patch("/cart/:productId", validateToken, updateItemCart);

router.delete("/cart/:productId", validateToken, deleteItemCart);

router.delete("/cart/clear", validateToken, clearCart);

export default router;
