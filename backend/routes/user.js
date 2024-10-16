import express from 'express'
const router = express.Router();
import {login,register,checkOTP,changePassword,forgotPassword,resetPassword,updateUser,loadme,logout, getBalance, getAllUsers, updateUserRole} from '../controllers/user.js'
import { isAuthenticate, isCheckRole } from '../middlewares/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/me').get(isAuthenticate,loadme);
router.route('/logout').get(logout);
router.route('/user/update').put(isAuthenticate,updateUser);
router.route('/user/change-password').put(isAuthenticate,changePassword);
router.route('/forgot-password').post(forgotPassword);
router.route('/reset-password/:token').put(resetPassword);
router.route('/verify-otp').post(checkOTP);
router.route('/balance').get(isAuthenticate,getBalance);
router.route('/users').get(isAuthenticate, isCheckRole('admin'), getAllUsers);
router.route('/user/:id/role').put(isAuthenticate, isCheckRole('admin'), updateUserRole);



export default router;