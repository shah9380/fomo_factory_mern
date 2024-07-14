import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import cron from 'node-cron'
import { fetchStocksData, deleteTheData } from './controller/stocksctrl';

import { connectDataBase } from './config/database';
import stocksRouter from './router/stocksrouter';
import bodyParser from 'body-parser';
dotenv.config();


const app = express();
const PORT = 4000;


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/stocks", stocksRouter)


app.listen(PORT, async () => {
    await connectDataBase();
    console.log(`Server is running at ${PORT}`)
    cron.schedule('*/3 * * * * *', fetchStocksData);
    cron.schedule('*/3 * * * *', deleteTheData);
})