import { razorpayInstance } from "../server.js";
import crypto from "crypto";
import UserModel from "../models/user.js";
import wallet from "../web3/wallets.js";
import { PaymentModel } from "../models/payment.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";


export const checkout = catchAsyncError(async (req, res) => {
  const {amount, coins} = req.body;
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await razorpayInstance.orders.create(options);

  const payment = await PaymentModel.create({
    razorpay_order_id: order.id,
    amount,
    coins,
    user: req.user._id,
    status: "pending",
  });

  res.status(200).json({
    success: true,
    order,
  });
  });

export const paymentVerification = catchAsyncError(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  console.log(process.env.RAZARPAY_API_SECRET)
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZARPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  const payment = await PaymentModel.findOne({razorpay_order_id})
  const user = await UserModel.findById(payment.user);

 
  if (isAuthentic) {
    // add coins to user account
    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    payment.status = "success";
    await payment.save();
    console.log('payment',user.walletAddress,Number(payment.coins))
    await wallet.addCoins(user.walletAddress,Number(payment.coins));
    res.redirect(
      `${process.env.FRONTEND_URL}/payment-success?reference=${razorpay_payment_id}&coins=${payment.coins}`
    );
  } else {
    payment.razorpay_payment_id = razorpay_payment_id;
    payment.razorpay_signature = razorpay_signature;
    payment.status = "failed";
    await payment.save();
    res.status(400).json({
      success: false,
    });
  }
});



export const getRazorpayKey = catchAsyncError(  async (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZARPAY_API_KEY,
  });
});

