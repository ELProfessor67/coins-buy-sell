import app from './app.js';
import Razorpay from 'razorpay';
import { initIncrementCron } from './cronjobs/incrementCoinsJob.js';

export const razorpayInstance = new Razorpay({
    key_id: process.env.RAZARPAY_API_KEY,
    key_secret: process.env.RAZARPAY_API_SECRET
})

const PORT = process.env.PORT || 4000;

initIncrementCron()

app.listen(PORT,() => {
    console.log('server url: ',`http://localhost:${PORT}`)
})