import express from "express"
import { contactsSearch } from "../controllers/ContactsController.js";
import { checkToken } from "../middlewares/AuthMiddleware.js";

export const contactRouter=express.Router();

contactRouter.post("/search",checkToken,contactsSearch);