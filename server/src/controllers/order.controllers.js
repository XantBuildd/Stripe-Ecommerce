import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import crypto from "crypto";
import { createSession } from "../services/stripe.service.js";
import { stripe } from "../services/stripe.service.js";
import Product from "../models/product.model.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    if (orders.length === 0) {
      return res.status(200).json({ orders: [] });
    }

    return res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const createCheckoutSession = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    if (cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const randomSerial = crypto.randomBytes(6).toString("hex");

    for (const item of cart.items) {
      const product = await Product.findById(item.product);
      if (product.stock < item.quantity) {
        return res
          .status(401)
          .json({ message: "No enough Stock for: " + product.title });
      }
    }

    const order = await Order.create({
      user: req.user.id,
      orderNumber: "ORD" + "-" + randomSerial,
      items: cart.items,
      total: cart.total,
      currency: "USD",
      status: "pending",
      paymentStatus: "pending",
    });

    const session = await createSession(order);

    order.stripeSessionId = session.id;

    await order.save();

    return res.status(201).json({
      message: "Checkout session created",
      orderId: order._id,
      checkoutUrl: session.url,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const stripeWebhook = async (req, res) => {
  try {
    const signature = req.headers["stripe-signature"];

    if (!signature) {
      return res.status(400).json({
        message: "Missing Stripe signature",
      });
    }

    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const orderId = session.metadata.orderId;

      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({
          message: "Order not found",
        });
      }

      if (order.paymentStatus === "paid") {
        return res.status(200).json({
          received: true,
        });
      }

      order.paymentStatus = "paid";
      order.status = "completed";

      await order.save();

      const cart = await Cart.findOne({ user: order.user });
      if (cart) {
        cart.items = [];
        cart.total = 0;

        for (const item of order.items) {
          const product = await Product.findById(item.product);
          product.stock = product.stock - item.quantity;
          await product.save();
        }
        await cart.save();
      }
    }

    return res.status(200).json({
      received: true,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};

export const getOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await Order.findOne({ user: req.user.id, _id: orderId });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateStatusOrder = (req, res) => {};
