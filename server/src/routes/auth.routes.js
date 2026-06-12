import { Router } from "express";
import { register, login, logout } from "../controllers/auth.controllers.js";
import { registerSchema, loginSchema } from "../schemas/auth.schemas.js";
import { validateSchema } from "../middlewares/validateSchema.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

export default router;
