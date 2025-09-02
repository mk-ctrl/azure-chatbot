import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import cors from 'cors';
import botResponse from './util/router/response.router.js'
import authenticate from './util/router/auth.router.js'
const app = express();
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use('/msg',botResponse);
app.use('/api',authenticate);

app.listen(4476,()=> console.log("Server running on 4476"));