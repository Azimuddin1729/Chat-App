import {User} from "../models/UserModel"
import jwt from "jsonwebtoken"

const duration=24*60*60*1000;

async function signup(res,req,next){
   try{
      const {email,password} = req.body;
      if(!email || !password){ //this could have been checked using zod as well

        return res.status(400).send("Email and Password is needed");
      }
      const user=await User.create({email,password});
        const token=jwt.sign({
            email,
            userId:user.id
        }
        ,process.env.JWT_SECRETKEY,
        {expiresIn:duration}
        )
      
    
   }
   catch(e){
     console.log(e);
    //  console.log({e});
     return res.status(500).send("Server Error");
   }
}