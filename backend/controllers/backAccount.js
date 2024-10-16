import catchAsyncError from '../middlewares/catchAsyncError.js';
import BankAccountModel from '../models/bankAccount.js';
import UserModel from '../models/user.js';

export const createBankAccount = catchAsyncError(async (req, res) => {
  try {
    const { accountNumber, accountHolderName, bankName, ifscCode } = req.body;
    
    // Check if the user already has a bank account
    let existingBankAccount = await BankAccountModel.findOne({ user: req.user._id });

    if (existingBankAccount) {
      // Update existing bank account
      existingBankAccount.accountNumber = accountNumber || existingBankAccount.accountNumber;
      existingBankAccount.accountHolderName = accountHolderName || existingBankAccount.accountHolderName;
      existingBankAccount.bankName = bankName || existingBankAccount.bankName;
      existingBankAccount.ifscCode = ifscCode || existingBankAccount.ifscCode;

      await existingBankAccount.save();
      res.status(200).json({ success: true, message: 'Bank account updated successfully', bankAccount: existingBankAccount });
    } else {
      // Create new bank account
      const newBankAccount = new BankAccountModel({
        user: req.user._id,
        accountNumber,
        accountHolderName,
        bankName,
        ifscCode
      });
      await newBankAccount.save();
      await UserModel.findByIdAndUpdate(req.user._id, { bankAccount: newBankAccount._id });
      res.status(201).json({ success: true, message: 'Bank account created successfully', bankAccount: newBankAccount });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export const getBankAccounts = catchAsyncError(async (req, res) => {
  try {
    const bankAccounts = await BankAccountModel.find({ user: req.user._id });
    res.status(200).json({ success: true, bankAccounts });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

