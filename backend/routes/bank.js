import express from 'express';
import { createBankAccount,getBankAccounts } from '../controllers/backAccount.js';
import { isAuthenticate } from '../middlewares/auth.js';

const router = express.Router();

// Route to create a new bank account
router.post('/create', isAuthenticate, createBankAccount);
router.get('/accounts', isAuthenticate, getBankAccounts);

export default router;

