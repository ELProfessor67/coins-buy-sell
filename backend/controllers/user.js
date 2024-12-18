import catchAsyncError from '../middlewares/catchAsyncError.js';
import UserModel from '../models/user.js';
import sendEmail from '../utils/sendEmail.js';
import crypto from 'crypto'
import {generate} from 'referral-codes'

export const register = catchAsyncError(async (req, res) => {
	const {name, email, password,address,state,city,phone,country,refreralBy} = req.body;
    console.log(country)
    const [refreral] = generate({
		length: 15,
		count: 1
	})
	const isExist = await UserModel.findOne({email});
    const phoneExist = await UserModel.findOne({phone: phone});
	if(isExist) {
        res.status(409).json({
            success: false,
            message: 'User already exist'
        })
        return
    } 
	if(!name || !email || !password || !address || !city || !state || !phone || !country){
		res.status(404).json({
            success: false,
            message: 'All fields are required'
        })
        return
	}

    


	const user = await UserModel.create({
		name, email, password,address,state,city,phone,country,refreralBy,refreral,balance:0,isFirstTimeDeposit: true
	});
	await user.sendOTP();
	res.status(200).json({
		success: true,
		message: "OTP send to your email"
	})
	
});


export const login = catchAsyncError(async (req, res, next) => {

	const {email, password} = req.body;
	if(!email || !password){
        res.status(404).json({
            success: false,
            message: 'All fields are required'
        })
        return
    }
	let user = await UserModel.findOne({email});
    
	if (!user){
        res.status(401).json({
            success: false,
            message: 'Incorrect Email or Password'
        })
        return
    }

	const isMatch = await user.comparePassword(password);
   
    if (!isMatch){
        res.status(401).json({
            success: false,
            message: 'Incorrect Email or Password'
        })
        return
    }
	
	await user.sendOTP();
	res.status(200).json({
		success: true,
		message: "OTP send to your email"
	})
   
});


export const checkOTP = catchAsyncError(async (req, res, next) => {

	const {OTP} = req.body;
	console.log('otp',OTP)
	

	const user = await UserModel.findOne({OTP,OTPExpire: {$gt: Date.now()}});


	if (!user){
        res.status(401).json({
            success: false,
            message: 'OTP is invalid or has been expired ssss'
        })
        return
    }
  
    user.OTP = undefined;
    user.OTPExpire = undefined;
    await user.save();
    const token = user.getJWTToken();
	const option = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)
    }
    res.cookie('token',token,option).status(201).json({
        success: true,
        message:  `Welcome Back, ${user.name}.`,
        user
    })
});

export const loadme = catchAsyncError(async (req, res, next) => {

	res.status(200).json({
		success: true,
		user: req.user
	})
});

export const logout = catchAsyncError(async (req, res, next) => {
	res.clearCookie('token').status(200).json({
		success: true,
		message: 'Logout successfully'
	})
});

export const updateUser = catchAsyncError(async (req, res, next) => {
	const {name, email,address,city,state,phone,adminServiceCharge} = req.body;
	

	const user = await UserModel.findByIdAndUpdate(req.user._id,{name, email,address,city,state,phone,adminServiceCharge});
	
	res.status(200).json({
		success: true,
		message: "Update Successfully"
	})
});

export const changePassword = catchAsyncError(async (req, res, next) => {
	const {oldpassword, newpassword} = req.body;
	const user = await UserModel.findById(req.user._id);
	
	const isMatch = await user.comparePassword(oldpassword);
    if (!isMatch){
        res.status(401).json({
            success: false,
            message: 'Incorrect old password'
        })
        return
    }
	
	user.password = newpassword;
	await user.save();
    res.status(200).json({
		success: true,
		message: "Password update successfully"
	})
});


// forgot password 
export const forgotPassword = catchAsyncError(async (req, res, next) => {
    const { email } = req.body;
    // console.log(email)

    const user = await UserModel.findOne({ email });

    if (!user){
        res.status(401).json({
            success: false,
            message: 'User Not Exist'
        })
        return
    }

    const resetToken = await user.getResetToken();

    await user.save();

    const url = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

    const message = `Click on the link to reset your password. ${url}. If you have not request then please ignore.`;
    // Send token via email
    await sendEmail(user.email, "HG Streaming Reset Password", message);
	console.log(url);
	res.status(200).json({
        success: true,
        message: `Reset Token has been sent to ${user.email}`
    })
        
  });

// reset password 
export const resetPassword = catchAsyncError(async (req, res, next) => {
    const { token } = req.params;
  
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
  
    const user = await UserModel.findOne({
      resetPasswordToken,
      resetPasswordExpire: {
        $gt: Date.now(),
      },
    });
  
    if (!user){
        res.status(401).json({
            success: false,
            message: 'Invalid Token or Maybe Expire'
        })
        return
    }
  
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
  
    await user.save();
	res.status(200).json({
        success: true,
        message: `Password Reset Successfully`
    })
  });



  export const getBalance = catchAsyncError(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id);
    const balance = await user.getBalence();
    
	res.status(200).json({
        success: true,
        balance
    })
  });


export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await UserModel.find();

    res.status(200).json({
        success: true,
        users
    });
});

export const updateUserRole = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { role } = req.body;

    const user = await UserModel.findById(id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    user.role = role;
    await user.save();

    res.status(200).json({
        success: true,
        message: 'User role updated successfully'
    });
});