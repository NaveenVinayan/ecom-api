import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { order,getOrders,getOrder,updateStatus,getUserOrder, cancelOrder } from "../controllers/orderControler.js";
 

const router = express.Router();

router.post('/:productId/:userId', authMiddleware, order) 
router.get('/',authMiddleware,getOrders) 
router.get('/:id',authMiddleware,getOrder)
router.get('/orders/:id',authMiddleware,getUserOrder)
router.put('/:id',authMiddleware,updateStatus)
router.put('/cancel/:id',authMiddleware,cancelOrder)


export default router;