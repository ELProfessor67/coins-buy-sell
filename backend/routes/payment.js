import express from 'express';
import { checkout, paymentVerification,getRazorpayKey } from '../controllers/payments.js';
const router = express.Router();
import { isAuthenticate } from '../middlewares/auth.js';

router.route("/checkout").post(isAuthenticate,checkout);

router.route("/paymentverification").post(paymentVerification);
router.route("/api-key/get").get(getRazorpayKey);
export default router;


