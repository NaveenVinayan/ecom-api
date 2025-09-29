import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../lib/cloudinary.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/add", authMiddleware, upload.single("image"), addProduct);
router.get("/:id", getProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
