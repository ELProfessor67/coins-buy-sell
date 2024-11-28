import { razorpayInstance } from "../server.js";
import crypto from "crypto";
import UserModel from "../models/user.js";
import { PaymentModel } from "../models/payment.js";
import catchAsyncError from "../middlewares/catchAsyncError.js";
import {Cashfree} from 'cashfree-pg'
import { config } from "dotenv";
import { generateOrderID } from "../utils/generateOrderId.js";
config();

Cashfree.XClientId = process.env.CASH_FREE_APP_ID;
Cashfree.XClientSecret = process.env.CASH_FREE_SECRET_KEY;
Cashfree.XEnvironment = process.env.MODE == 'dev' ? Cashfree.Environment.SANDBOX: Cashfree.Environment.PRODUCTION;


// export const checkout = catchAsyncError(async (req, res) => {
//   const {amount, coins} = req.body;
//   const options = {
//     amount: Number(req.body.amount * 100),
//     currency: "INR",
//   };

//   const order = await razorpayInstance.orders.create(options);

//   const payment = await PaymentModel.create({
//     razorpay_order_id: order.id,
//     amount,
//     coins,
//     user: req.user._id,
//     status: "pending",
//   });

//   res.status(200).json({
//     success: true,
//     order,
//   });
//   });



export const checkout = catchAsyncError(async (req, res) => {
  const {amount, coins} = req.body;
  const {name,email,phone,_id} = req.user;
  const request = {
    "order_amount": Number(req.body.amount),
    "order_currency": "INR",
    "order_id": await generateOrderID(),
    "customer_details": {
      "customer_id": _id.toString(),
      "customer_name": name,
      "customer_email": email,
      "customer_phone": phone
    }
  };


  const response = await Cashfree.PGCreateOrder("2022-09-01", request);
  const payment = await PaymentModel.create({
    razorpay_order_id: response.data.order_id,
    amount,
    coins,
    user: req.user._id,
    status: "pending",
  });



  

  res.status(200).json({
    success: true,
    order: response.data,
  });
});


// export const paymentVerification = catchAsyncError(async (req, res) => {
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;

//   const body = razorpay_order_id + "|" + razorpay_payment_id;
//   console.log(process.env.RAZARPAY_API_SECRET)
//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZARPAY_API_SECRET)
//     .update(body.toString())
//     .digest("hex");

//   const isAuthentic = expectedSignature === razorpay_signature;

//   const payment = await PaymentModel.findOne({razorpay_order_id})
//   const user = await UserModel.findById(payment.user);

 
//   if (isAuthentic) {
//     // add coins to user account
//     payment.razorpay_payment_id = razorpay_payment_id;
//     payment.razorpay_signature = razorpay_signature;
//     payment.status = "success";
//     await payment.save();
//     user.balance += Number(payment.coins);

//     if(user.isFirstTimeDeposit == true && user.refreralBy){
//       const refreralUser = await UserModel.findOne({refreral: user.refreralBy});
//       if(refreralUser){
//         refreralUser.balance += 1;
//         refreralUser.save();
//       }
//     }

//     user.isFirstTimeDeposit = false;
//     await user.save();
    
//     res.redirect(
//       `${process.env.FRONTEND_URL}/payment-success?reference=${razorpay_payment_id}&coins=${payment.coins}`
//     );
//   } else {
//     payment.razorpay_payment_id = razorpay_payment_id;
//     payment.razorpay_signature = razorpay_signature;
//     payment.status = "failed";
//     await payment.save();
//     res.status(400).json({
//       success: false,
//     });
//   }
// });

export const paymentVerification = catchAsyncError(async (req, res) => {
  const {order_id,payment_id,sign } = req.body;
  
  const payment = await PaymentModel.findOne({razorpay_order_id: order_id})
  const user = await UserModel.findById(payment.user);


  Cashfree.PGFetchOrder("2022-09-01", order_id).then(async (response) => {
    if(response.data.order_status != "PAID") throw new Error("Payment Failed");
    payment.razorpay_payment_id = payment_id;
    payment.razorpay_signature = sign;
    payment.status = "success";
    await payment.save();
    user.balance += Number(payment.coins);

    if(user.isFirstTimeDeposit == true && user.refreralBy){
      const refreralUser = await UserModel.findOne({refreral: user.refreralBy});
      if(refreralUser){
        refreralUser.balance += 1;
        refreralUser.save();
      }
    }

    user.isFirstTimeDeposit = false;
    await user.save();
    
    res.status(200).json({
      success: true,
      url: `${process.env.FRONTEND_URL}/payment-success?reference=${payment_id}&coins=${payment.coins}`
    });
  }).catch(async (err) => {
    payment.razorpay_payment_id = payment_id;
    payment.razorpay_signature = sign;
    payment.status = "failed";
    await payment.save();
    res.status(200).json({
      success: false,
      url: `${process.env.FRONTEND_URL}/payment-failed?reference=${payment_id}&coins=${payment.coins}`
    });
  })

});


export const getRazorpayKey = catchAsyncError(  async (req, res) => {
  res.status(200).json({
    success: true,
    key: process.env.RAZARPAY_API_KEY,
  });
});

