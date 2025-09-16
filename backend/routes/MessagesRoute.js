import express from "express"
import { checkToken } from "../middlewares/AuthMiddleware.js";
import { getMessages, uploadFiles } from "../controllers/MessagesController.js";
import multer from "multer";
export const messageRouter=express.Router();

messageRouter.post("/get-messages",checkToken,getMessages)


const upload=multer({dest:"uploads/files"})

messageRouter.post("/upload-file",checkToken,upload.single("file"),uploadFiles);

export default messageRouter