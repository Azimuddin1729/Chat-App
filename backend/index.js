import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

dotenv.config();
const port=process.env.PORT||3003;
const database_url=process.env.DATABASE_URL;

const app= express();

app.use(cors({
    origin:process.env.ORIGIN,
    methods:["GET","POST","PUT","DELETE"],
    credentials: true
}));

app.use(express.json());


app.listen(port,()=>{
    console.log(`server is started at http://localhost:${port}`)
});

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


