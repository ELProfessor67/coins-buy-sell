import catchAsyncError from "../middlewares/catchAsyncError.js";
import WithdrawRequestModel from "../models/widthraw.js";
import ErrorHandler from "../utils/errorHandler.js";
import UserModel from "../models/user.js";
import user from "../models/user.js";

export const createWithdrawRequest = catchAsyncError(async(req,res,next)=>{
    const {amount,method,coins} = req.body;

    if(method === 'bank' && !req.user?.bankAccount){
        return next(new ErrorHandler('Please add bank account first',400));
    }
    const user = await UserModel.findById(req.user._id);
    const balance = await user.getBalence();

    if(balance < amount){
        return next(new ErrorHandler('Your balance is less than the amount you want to withdraw',400));
    }

    const withdrawRequest = await WithdrawRequestModel.create({
        user:user._id,amount,method,bankAccount:req.user?.bankAccount,coins,status:'processing'
    });

    try {
        user.balance -= Number(coins);
        await user.save();
    } catch (error) {
        console.log(error);
        await WithdrawRequestModel.findByIdAndDelete(withdrawRequest._id);
        return next(new ErrorHandler('Something went wrong',500));
    }



    res.status(201).json({
        success:true,
        message:'Your withdraw request has been submitted successfully',
        withdrawRequest
    })
})

export const getUserWidthrawRequest = catchAsyncError(async(req,res,next)=>{
    const user = req.user;
    const withdrawRequests = await WithdrawRequestModel.find({user:user._id});
    res.status(200).json({
        success:true,
        withdrawRequests
    })
})
export const getAllWithdrawRequests = catchAsyncError(async (req, res, next) => {
    const withdrawRequests = await WithdrawRequestModel.find().populate('user').populate('bankAccount');
    res.status(200).json({
        success: true,
        withdrawRequests
    });
});

export const getSingleWidthrawRequest = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const withdrawRequest = await WithdrawRequestModel.findById(id).populate('user').populate('bankAccount');
    
    if (!withdrawRequest) {
        return res.status(404).json({
            success: false,
            message: "Withdraw request not found"
        });
    }

    if(req.user.role !== 'admin' && withdrawRequest.user._id.toString() !== req.user._id.toString()){
        return next(new ErrorHandler('You are not authorized to access this withdraw request',403));
    }

    res.status(200).json({
        success: true,
        withdrawRequest
    });
});

export const updateWidthrawRequestStatus = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;

    const withdrawRequest = await WithdrawRequestModel.findById(id).populate('user');
    const user = await UserModel(withdrawRequest.user._id)

    if (!withdrawRequest) {
        return res.status(404).json({
            success: false,
            message: "Withdraw request not found"
        });
    }

    if (!['pending', 'processing', 'completed', 'rejected'].includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid status"
        });
    }

    withdrawRequest.status = status;
    await withdrawRequest.save();
    if(status === 'rejected'){
        user.balance += Number(withdrawRequest.coins);
        await user.save();
    }

    res.status(200).json({
        success: true,
        message: "Withdraw request status updated successfully",
        withdrawRequest
    });
});


