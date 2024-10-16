import express from 'express';
const router = express.Router();
import {isAuthenticate,isCheckRole} from '../middlewares/auth.js';
import {createWithdrawRequest,getUserWidthrawRequest,getAllWithdrawRequests,getSingleWidthrawRequest,updateWidthrawRequestStatus} from '../controllers/widthraw.js';


router.post('/create',isAuthenticate, createWithdrawRequest);
router.get('/get-all-user-withdraw-requests',isAuthenticate,getUserWidthrawRequest);
router.get('/get-all-withdraw-requests',isAuthenticate,isCheckRole('admin'),getAllWithdrawRequests);
router.get('/widthraw-request/:id',isAuthenticate,getSingleWidthrawRequest);
router.put('/update-withdraw-request-status/:id',isAuthenticate,isCheckRole('admin'),updateWidthrawRequestStatus);

export default router;
