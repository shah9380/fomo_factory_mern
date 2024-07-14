import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import cron from 'node-cron'
import { fetchStocksData, deleteTheData } from './controller/stocksctrl';

import { connectDataBase } from './config/database';
dotenv.config();


const app = express();
const PORT = 4000;


app.use(cors());


app.listen(PORT, async () => {
    await connectDataBase();
    console.log(`Server is running at ${PORT}`)
    cron.schedule('*/3 * * * * *', fetchStocksData);
    cron.schedule('*/3 * * * *', deleteTheData);
})