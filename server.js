import express from "express";
import dotenv from "dotenv";

const app = express();

dotenv.config({ path: "./config/config.env" });

import cors from 'cors';
import routes from './routes/index.js';

import {connectDB} from './config/database.js'


const api_version = process.env.API_VERSION;

// Middleware to parse JSON data from requests
app.use(express.json());

connectDB();

app.use(`/arohi/${api_version}`, routes());

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${process.env.PORT} ,in ${process.env.NODE_ENV} MODE`
  );
});