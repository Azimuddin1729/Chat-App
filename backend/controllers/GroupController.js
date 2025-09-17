import mongoose from "mongoose";
import Group from "../models/GroupModel.js";
import { User } from "../models/UserModel.js";

export async function groupCreate(req,res,next){
    try{
        const {name,members} = req.body
        const userId=req.userId
        const admin=await User.findById(userId);
        if(!admin){
            return res.status(400).send("Admin User not found")
        }

        const validMem=await User.find({_id:{$in:members}})

        if(validMem.length!==members.length){
            return res.status(400).send("all are not legit users")
        }
        const newGroup= await Group.create({name,members,admin:userId})
         console.log(newGroup);
        return res.status(201).json({group:newGroup})
    }
    catch(e){
        console.log(e);
        return res.status(500).send("intenral Server error")
    }
}


export async function getUserGroups(req,res,next){
    try{
        const userId= new mongoose.Types.ObjectId(req.userId)
        const groups=await Group.find({
            $or:[{admin:userId},{members:userId}],

        }).sort({updatedAt:-1})

        return res.status(201).json({groups})
    }
    catch(e){
        console.log(e);
        return res.status(500).send("intenral Server error")
    }
}