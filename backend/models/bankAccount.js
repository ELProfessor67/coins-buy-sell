import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  accountHolderName: {
    type: String,
    required: true
  },
  bankName: {
    type: String,
    required: true
  },
  ifscCode: {
    type: String,
    required: true
  }
},{timestamps:true});

const BankAccountModel = mongoose.model('BankAccount', bankAccountSchema);

export default BankAccountModel;
