import express from 'express';
import { config } from 'dotenv';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import ErrorMiddleware from './middlewares/error.js';
import connectDB from './config/database.js';
import routes from './routes/index.js'

config({
    path: '.env'
})

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());


app.use(cors({
    origin: [process.env.FRONTEND_URL],
    credentials: true
}))


const prefix = "/api/v1"
app.use(prefix,routes);

app.get('/',(req,res) => {
    res.send('Everting is Working fine.');
})

// Middleware for Errors
app.use(ErrorMiddleware);

export default app;