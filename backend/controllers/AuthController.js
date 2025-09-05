import { compare } from "bcrypt";
import {User} from "../models/UserModel.js"
import jwt from "jsonwebtoken"

const maxAge=24*60*60*1000;

export async function signup(req,res,next){ //will use this in app.get(" ",signup)
  //will add the logic to check if person exists already or not 
  //we dont need next here i believe
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
        {expiresIn:maxAge}
        )

        res.cookie("jwt",token,{maxAge,
          secure:true,
          sameSite:"None"
        },
        )

        return res.status(201).json({
           user:{
            id:user.id,
            email:user.email,
            profileSetup:user.profileSetup

           }
        })

       

   }
   catch(e){
     console.log(e);
    //  console.log({e});
     return res.status(500).send("Server Error");
   }
}


export async function login(req,res,next){ //
   try{
      const {email,password} = req.body;
      if(!email || !password){ 
        return res.status(400).send("Email and Password is needed");
      }
      const user=await User.findOne({email});
      if(!user){
        return res.status(404).send("User with given mail not found");
      }
      const checkPassword= await compare (password,user.password);

      if(!checkPassword){
        return  res.status(400).send("Password is incorrect");
      }

        const token=jwt.sign({
            email,
            userId:user.id
        }
        ,process.env.JWT_SECRETKEY,
        {expiresIn:maxAge}
        )

        res.cookie("jwt",token,{maxAge,
          secure:true,
          sameSite:"None"
        },
        )
//201 for creating status and 200 for sending response ok
        return res.status(200).json({
           user:{
            id:user.id,
            email:user.email,
            profileSetup:user.profileSetup,
            firstName:user.firstName,
            lastName:user.lastName,
            image:user.image,
            color:user.color,
           }
        })
       //these being sent but if the (not required field) are not put into databsse
      //  then console log in client will be showing jsust the required three details

   }
   catch(e){
     console.log(e);
    //  console.log({e});
     return res.status(500).send("Server Error");
   }
}

export async function userinfo (req,res,next){
   try{
       console.log(req.userId);
      const userData=await User.findById(req.userId);
      if(!userData){
        return res.status(404).send("User with given id not found");
      }
      

      //  next();
//201 for creating status and 200 for sending response ok
        return res.status(200).json({
           user:{
            id:userData.id,
            email:userData.email,
            profileSetup:userData.profileSetup,
            firstName:userData.firstName,
            lastName:userData.lastName,
            image:userData.image,
            color:userData.color,
           }
        })
       //these being sent but if the (not required field) are not put into databsse
      //  then console log in client will be showing jsust the required three details

   }
   catch(e){
     console.log(e);
    //  console.log({e});
     return res.status(500).send("Server Error");
   }
}