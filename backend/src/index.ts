import express from 'express';
import cors from 'cors';
import { connectDataBase } from './config/database';


const app = express();
const PORT = 4000;


app.use(cors());

connectDataBase();

app.listen(PORT, async () => {
    console.log(`Server is running at ${PORT}`)
})