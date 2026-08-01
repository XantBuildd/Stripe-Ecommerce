import { Router } from "express";
import {
  register,
  login,
  logout,
  googleCallback,
} from "../controllers/auth.controllers.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import passport from "passport";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback,
);

export default router;
