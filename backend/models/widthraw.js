import mongoose from 'mongoose';

const withdrawRequestSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  amount: {
    type: Number,
    required: true,
  },
  bankAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BankAccount',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'rejected'],
    default: 'pending'
  },
  method: {
    type: String,
    enum: ['bank','UPI','phonepe','paytm','googlepay'],
    required: true
  },
  coins:{
    type:Number,
    required:true
  }
}, { timestamps: true });

const WithdrawRequestModel = mongoose.model('WithdrawRequest', withdrawRequestSchema);



export default WithdrawRequestModel;
