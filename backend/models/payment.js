import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: false,
    default: null,
  },
  razorpay_signature: {
    type: String,
    required: false,
    default: null
  },
  amount: {
    type: Number,
    required: true,
  },
  coins: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },
},{timestamps: true});

export const PaymentModel = mongoose.model("payment", paymentSchema);