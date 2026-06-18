import { Router } from "express";
import {
  getOrders,
  createCheckoutSession,
  getOrder,
  updateStatusOrder,
  stripeWebhook,
} from "../controllers/order.controllers.js";
import { validateToken } from "../middlewares/validateToken.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/orders", validateToken, getOrders);

router.post("/orders/checkout", validateToken, createCheckoutSession);

router.post("/orders/webhook", validateToken, stripeWebhook);

router.get("/orders/:orderId", validateToken, getOrder);

router.patch("/orders/:orderId", validateToken, isAdmin, updateStatusOrder);

export default router;
