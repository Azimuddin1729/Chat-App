import express from "express"
import { checkToken } from "../middlewares/AuthMiddleware.js";
import { getMessages } from "../controllers/MessagesController.js";
export const messageRouter=express.Router();

messageRouter.post("/get-messages",checkToken,getMessages)

export default messageRouter