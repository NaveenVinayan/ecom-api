import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addWishItem ,getWishItems } from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/:id", authMiddleware, getWishItems);
router.post("/:id/:userId", authMiddleware, addWishItem);
// router.delete("/:id", authMiddleware, deleteWishItem);

export default router;
