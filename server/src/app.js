import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import dbConnect from "./db.js";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";

dotenv.config();
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

export default app;
