import "./config/env.js"

import express from "express";
import morgan from "morgan";
import cors from "cors";
import dbConnect from "./db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
dbConnect();

app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.use("/api", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);
app.use("/api", orderRoutes);

export default app;
