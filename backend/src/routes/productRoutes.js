import { Router } from "express";
import {
  listProducts,
  getProductBySlug,
  getProductVariants,
  getProductEmiPlans,
} from "../controllers/productController.js";

const router = Router();

router.get("/", listProducts);
router.get("/:slug", getProductBySlug);
router.get("/:id/variants", getProductVariants);
router.get("/:id/emi-plans", getProductEmiPlans);

export default router;
