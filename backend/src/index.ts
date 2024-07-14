import express from 'express';
import cors from 'cors';
import dotenv from "dotenv"
import cron from 'node-cron'
import { fetchStocksData, deleteTheData } from './controller/stocksctrl';
// import http from 'http';
import WebSocket from 'ws';
import path from 'path';
import https from "https";
const socketIo = require('socket.io');

import { connectDataBase } from './config/database';
import stocksRouter from './router/stocksrouter';
import bodyParser from 'body-parser';
dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();
// const server = http.createServer(app);
const server = https.createServer(app);
const io = socketIo(server);
const wss : WebSocket.Server = new WebSocket.Server({server});


app.use(cors());
app.use(cors({
    origin: '*', // Replace with your frontend URL
    methods: ['GET', 'POST'] // Allow specific HTTP methods
}));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use("/api/stocks", stocksRouter)


app.use(express.static(path.join(__dirname, "../../client/build")))

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
})

// WebSocket server logic
// wss.on('connection', (ws: WebSocket) => {
//     console.log('Client connected to WebSocket');

//     // ws.on('message', (message: string) => {
//     //     console.log('Received WebSocket message:', message);
//     // });

//     ws.on('close', () => {
//         console.log('Client disconnected from WebSocket');
//     });
// });

app.listen(PORT, async () => {
    await connectDataBase();
    await io.on('connection', (socket: any) => {
        console.log('Client connected to Socket.IO');
    
        socket.on('disconnect', () => {
            console.log('Client disconnected from Socket.IO');
        });
    });
    console.log(`Server is running at ${PORT}`)
    cron.schedule('*/3 * * * * *', fetchStocksData);
    cron.schedule('*/3 * * * *', deleteTheData);
})


export { wss, io };