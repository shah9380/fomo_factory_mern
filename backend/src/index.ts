import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import cron from 'node-cron'
import { fetchStocksData, deleteTheData } from './controller/stocksctrl';
import http from 'http';
import WebSocket from 'ws';

import { connectDataBase } from './config/database';
import stocksRouter from './router/stocksrouter';
import bodyParser from 'body-parser';
dotenv.config();


const app = express();
const server = http.createServer(app);
const wss : WebSocket.Server = new WebSocket.Server({server});
const PORT = process.env.PORT || 4000;


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/stocks", stocksRouter)

// wss.on('connection', (ws: WebSocket) => {
//     console.log("client connected to websocket")

//     const interval = setInterval(()=>{
//         ws.send(JSON.stringify({message : 'Real time update'}))
//     }, 3000)

//     ws.on('close', ()=>{
//         console.log('Client Disconnected from websoket')
//         clearInterval(interval);
//     })
// })

app.listen(PORT, async () => {
    await connectDataBase();
    console.log(`Server is running at ${PORT}`)
    cron.schedule('*/3 * * * * *', fetchStocksData);
    cron.schedule('*/3 * * * *', deleteTheData);
})


export { wss };