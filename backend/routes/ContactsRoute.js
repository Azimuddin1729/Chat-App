import express from "express"
import { contactsSearch, getDMContacts } from "../controllers/ContactsController.js";
import { checkToken } from "../middlewares/AuthMiddleware.js";

export const contactRouter=express.Router();

contactRouter.post("/search",checkToken,contactsSearch);

contactRouter.get("/get-dmcontacts",checkToken,getDMContacts)