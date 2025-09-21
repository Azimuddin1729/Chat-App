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
import groupRouter from "./routes/GroupRoute.js";


import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const port=process.env.PORT||3003;
const database_url=process.env.DATABASE_URL;

const app= express();

app.set("trust proxy", 1);

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
app.use("/api/group",groupRouter);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const clientDist = path.join(__dirname, "../frontend/dist");
app.use(express.static(clientDist));

app.get(/^\/(?!api|uploads|socket\.io).*/, (req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});


const connectToMDb= async()=>{
    try{
        await mongoose.connect(database_url);
        console.log('DB connected succesfully');

        //now server listen:

        const server =app.listen(port,()=>{
            console.log(`server is started `)
        });

        setupSocket(server);

    }
    catch(e){
        console.log('Something went wrong while connecting to DB',e.message);
    }
}

connectToMDb();






