import catchAsyncError from '../middlewares/catchAsyncError.js';
import UserModel from '../models/user.js';
import TokenModel from '../models/tokens.js';
import ErrorHandler from '../utils/errorHandler.js';
import cloudinary from 'cloudinary';
import getDataUri from '../utils/dataUri.js';

export const addToken = catchAsyncError(async (req, res, next) => {
    const { name, price } = req.body;
    const file = req.file;
    
    if (!file) return next(new ErrorHandler('All Fields are required', 401));
    const fileUri = getDataUri(file);
    const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);

    const newToken = TokenModel.create({
        name,
        price,
        image: {
            url: mycloud.secure_url,
            public_id: mycloud.public_id
        }
    })

    res.status(201).json({
        success: true,
        message: "Token Add Successfully"
    })
});

export const updateToken = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, price } = req.body;
    
    let token = await TokenModel.findById(id);
    if (!token) return next(new ErrorHandler('Token not found', 404));

    if (req.file) {
        const fileUri = getDataUri(req.file);
        const mycloud = await cloudinary.v2.uploader.upload(fileUri.content);
        
        // Delete old image
        if (token.image.public_id) {
            await cloudinary.v2.uploader.destroy(token.image.public_id);
        }

        token.image = {
            url: mycloud.secure_url,
            public_id: mycloud.public_id
        };
    }

    token.name = name || token.name;
    token.price = price || token.price;

    await token.save();

    res.status(200).json({
        success: true,
        message: "Token updated successfully",
        token
    });
});

export const deleteToken = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    
    const token = await TokenModel.findById(id);
    if (!token) return next(new ErrorHandler('Token not found', 404));

    // Delete image from cloudinary
    if (token.image.public_id) {
        await cloudinary.v2.uploader.destroy(token.image.public_id);
    }

    await token.remove();

    res.status(200).json({
        success: true,
        message: "Token deleted successfully"
    });
});

export const getTokenById = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    
    const token = await TokenModel.findById(id);
    if (!token) return next(new ErrorHandler('Token not found', 404));

    res.status(200).json({
        success: true,
        token
    });
});

export const getAllTokens = catchAsyncError(async (req, res, next) => {
    const tokens = await TokenModel.find();

    res.status(200).json({
        success: true,
        tokens
    });
});


export const buyToken = catchAsyncError(async (req, res, next) => {
    const {tokenId} = req.body;
    if(!tokenId) return next(new ErrorHandler('Please give Token Id',401));
    const user = await UserModel.findById(req.user._id);
    user.tokens = [...user.tokens,tokenId];
    await user.save()

    res.status(200).json({
        success: true,
        message: "Token buy successfully"
    });

});

export const sellToken = catchAsyncError(async (req, res, next) => {
    const {tokenId} = req.body;
    if(!tokenId) return next(new ErrorHandler('Please give Token Id',401));
    const user = await UserModel.findById(req.user._id);
    user.tokens = user.tokens.filter(t => tokenId != t);
    await user.save()

    res.status(200).json({
        success: true,
        message: "Token sell successfully"
    });

});