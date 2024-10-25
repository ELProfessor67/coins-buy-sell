import express from 'express';
import { addToken,updateToken,deleteToken,buyToken,getAllTokens,getTokenById, sellToken } from '../controllers/token.js';
const router = express.Router();
import { isAuthenticate,isCheckRole } from '../middlewares/auth.js';
import singleUpload from '../middlewares/multer.js';

router.route('/add-token').post(isAuthenticate,isCheckRole('admin'),singleUpload,addToken);
router.route('/delete-token/:id').delete(isAuthenticate,isCheckRole('admin'),deleteToken);
router.route('/update-token/:id').put(isAuthenticate,isCheckRole('admin'),updateToken);
router.route('/tokens').get(getAllTokens);
router.route('/tokens/:id').get(getTokenById);
router.route('/buy-tokens').post(isAuthenticate,buyToken);
router.route('/sell-tokens').post(isAuthenticate,sellToken);

export default router;

