
import express from "express"
import {login, signup,userinfo,updateprofile,profileimgadd,profileimgremove, logout} from "../controllers/AuthController.js"
import { checkToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";



export const authRouter=express.Router();
const upload=multer({dest:"uploads/profiles/"})

authRouter.post("/signup",signup)
authRouter.post("/login",login)
authRouter.get("/userinfo",checkToken,userinfo)

authRouter.put("/profile-update",checkToken,updateprofile)  

authRouter.put("/profile-img-add",checkToken,upload.single("profile-img"),profileimgadd) 

authRouter.delete("/profile-img-remove",checkToken,profileimgremove);

authRouter.post("/logout",logout)