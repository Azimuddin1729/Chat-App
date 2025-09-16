import express from "express";
// import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { authRouter } from "./routes/AuthRoute.js";
import { contactRouter } from "./routes/ContactsRoute.js";
import setupSocket from "./socket.js";
import messageRouter from "./routes/MessagesRoute.js";

dotenv.config();
const port=process.env.PORT||3003;
const database_url=process.env.DATABASE_URL;

const app= express();


app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());
app.use("/uploads/profiles",express.static("uploads/profiles"));
app.use("/uploads/files",express.static("uploads/files"));

app.use("/api/auth",authRouter);
app.use("/api/contacts",contactRouter);
app.use("/api/messages",messageRouter);

const server =app.listen(port,()=>{
    console.log(`server is started at http://localhost:${port}`)
});

setupSocket(server);


const connectToMDb= async()=>{
    try{
        await mongoose.connect(database_url);
        console.log('DB connected succesfully');
    }
    catch(e){
        console.log('Something went wrong while connecting to DB',e.message);
    }
}

connectToMDb();


