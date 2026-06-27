import { Router } from "express";
import { validateToken } from "../middlewares/validateToken.js";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  getNewReleasesProducts,
} from "../controllers/product.controllers.js";
import { upload } from "../middlewares/multer.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/product.schemas.js";

import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/products", getProducts);
router.get("/products/new-releases", getNewReleasesProducts);

router.get("/products/:slug", getProduct);


router.post(
  "/products",
  validateToken,
  isAdmin,
  upload.array("images", 3),
  validateSchema(createProductSchema),
  createProduct,
);

router.put(
  "/products/:slug",
  validateToken,
  isAdmin,
  upload.array("images", 3),
  validateSchema(updateProductSchema),
  updateProduct,
);

router.delete("/products/:slug", validateToken, isAdmin, deleteProduct);

export default router;
