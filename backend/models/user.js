import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';
import wallet from '../web3/wallets.js';


function generateOTP() {
	const otp = Math.floor(100000 + Math.random() * 900000);
	return otp.toString();
}
const schema = new mongoose.Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true, selected: false},
	address: {type: String},
	city: {type: String},
	state: {type: String},
	country: {type: String},
	phone: {type: String},
	phoneVerify: {type: Boolean, default: false},
	resetPasswordToken: {type: String, default: undefined},
	resetPasswordExpire: {type: String, default: undefined},
	OTP: {type: String,default: undefined},
	OTPExpire: {type: Date,default: undefined},
	refreral: {type: String,required: true, unique: true},
	refreralBy: {type: String, default: undefined},
	role: {type: String,default: 'user',enum: ['user','admin']},
	walletAddress: {type: String,required: true},
	bankAccount: {type: mongoose.Schema.Types.ObjectId, ref: 'BankAccount',default: undefined},
	tokens: [{type: mongoose.Schema.Types.ObjectId,ref: 'token',default: undefined}]
},{timestamps: true});

schema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	this.password =  await bcrypt.hash(this.password, 10);

	next();
  });
  
  schema.methods.getJWTToken = function () {
	return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
	  expiresIn: "15d",
	});
  };
  
  schema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
  };

  schema.methods.sendOTP = async function () {
	
	
	// Example usage:
	const otp = generateOTP();
	console.log("Generated OTP:", otp);
	this.OTP = otp;
	this.OTPExpire = Date.now() + 5 * 60 * 1000;
	await sendEmail(this.email, "HG Vibe Streaming OTP", otp)
	this.save();
	return otp;
  };
  
  schema.methods.getResetToken = function () {
	const resetToken = crypto.randomBytes(20).toString("hex");
  
	this.resetPasswordToken = crypto
	  .createHash("sha256")
	  .update(resetToken)
	  .digest("hex");
  
	this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  
	return resetToken;
  };

  schema.methods.getBalence = async function () {
	const balance = await wallet.getBalance(this.walletAddress);
	return balance;
  };



export default mongoose.model('user', schema);