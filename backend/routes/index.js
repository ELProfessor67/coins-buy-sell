import express from 'express';
import paymentRoutes from './payment.js';
import userRoutes from './user.js';
import bankRoutes from './bank.js';
import widthrawRoutes from './widthraw.js';
import tokenRoutes from './token.js'
const router = express.Router();
router.use('',userRoutes);
router.use('/razarpay',paymentRoutes);
router.use('/bank',bankRoutes);
router.use('/widthraw',widthrawRoutes);
router.use('/token',tokenRoutes);
export default router;

