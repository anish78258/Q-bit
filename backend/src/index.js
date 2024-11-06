import dotenv from 'dotenv'
import connectDB from './db/index.js';
import express from 'express';
import { app } from './app.js';
dotenv.config({
    path : './env'
})


console.log(process.env.MONG0DB_URI);
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log( process.env.PORT , "Connected Successfully");
    });
}).catch((error) => {
    console.log("Not connected to DB:", error);
});
