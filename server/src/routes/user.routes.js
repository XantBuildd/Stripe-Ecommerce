import Router from "express";
import { validateToken } from "./../middlewares/validateToken.js";
import {
  getProfile,
  updateProfile,
  changePassword,
  addToFavorites,
  getFavorites,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.js";

import { validateSchema } from "../middlewares/validateSchema.js";
import {
  updateProfileSchema,
  changePasswordSchema,
} from "../schemas/user.schemas.js";

const router = Router();

router.get("/profile", validateToken, getProfile);

router.put(
  "/profile",
  validateToken,
  upload.single("avatar"),
  validateSchema(updateProfileSchema),
  updateProfile,
);

router.put(
  "/change-password",
  validateToken,
  validateSchema(changePasswordSchema),
  changePassword,
);

router.get("/favorites", validateToken, getFavorites);

router.post("/favorites/:productId", validateToken, addToFavorites);

export default router;
