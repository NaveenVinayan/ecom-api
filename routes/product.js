import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addProduct,
  getProducts,
  upload,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", authMiddleware, getProducts);
router.post("/add", authMiddleware, upload.single("image"), addProduct);
router.get("/:id", authMiddleware, getProduct);
router.put("/:id", authMiddleware, updateProduct);
router.delete("/:id", authMiddleware, deleteProduct);

export default router;
