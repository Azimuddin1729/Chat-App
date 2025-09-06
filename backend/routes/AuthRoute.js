
import express from "express"
import {login, signup,userinfo,updateprofile} from "../controllers/AuthController.js"
import { checkToken } from "../middlewares/AuthMiddleware.js";

export const authRouter=express.Router();
authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/userinfo",checkToken,userinfo)

authRouter.put("/profile-update",checkToken,updateprofile)  