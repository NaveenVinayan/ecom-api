import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { login, register, verify, stats } from '../controllers/authController.js'


const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.get('/verify', authMiddleware, verify)
router.get('/stats', authMiddleware, stats)

 
export default router;