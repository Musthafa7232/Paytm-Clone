import { config } from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./database/dbConfig.js"
import userRouter from './routes/userRoutes.js'
import paymentRouter from './routes/paymentRoutes.js'
config();

const app=express()
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));

app.use("/api/payment",paymentRouter)
app.use("/api",userRouter)
let server;

connectDB().then(() => {
    server = app.listen(PORT, () => {
      console.log(`Server listening to port ${PORT}`);
    });
  });
  