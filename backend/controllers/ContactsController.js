import mongoose from "mongoose";
import { User } from "../models/UserModel.js";
import Message from "../models/MessagesModel.js";

export async function contactsSearch(req,res,next){
   try{
      const {searchTerm}=req.body;
      if(typeof searchTerm !== 'string' || searchTerm.trim().length === 0){
        return res.status(400).send("Give a Search Term")
      }
      const sanitizedSearchTerm=searchTerm.replace(/[*.{}?^+|[\]\\]/g,"\\$&");
      //replacing any form of text like a+b to literally "a\+b" string so only exact match of a+b is searched
      //not aab abb etc
      const regex=new RegExp(sanitizedSearchTerm,"i");
      //insensitive to casing
 

      const contacts=await User.find({
        $and: [
            {_id:{$ne: req.userId}},
// to not give the output of the user itself
            {$or: [
                { email: regex },
                { firstName: regex },
                { lastName: regex }
                ]
            }
        ],
        
                
      }).select("firstName lastName email image color");

      return res.status(200).json({
        contacts
      })
   }
     catch(e){
     console.log(e);
    //  console.log({e});
     return res.status(500).send("Server Error");
   }
}









export async function getDMContacts(req, res, next) {
  try {
    const userId = new mongoose.Types.ObjectId(req.userId);

    const contacts = await Message.aggregate([
      // Only direct messages (exclude channel msgs where recipient === null)
      {
        $match: {
          recipient: { $ne: null },
          $or: [{ sender: userId }, { recipient: userId }],
        },
      },

      // So $first in the next stage picks the latest
      { $sort: { timestamp: -1 } },

      // Compute "peerId" = the other user in this conversation
      {
        $addFields: {
          peerId: { $cond: [{ $eq: ["$sender", userId] }, "$recipient", "$sender"] },
        },
      },

      // One row per peer with the latest message fields
      {
        $group: {
          _id: "$peerId",
          lastMessageTime: { $first: "$timestamp" },
          lastMessageType: { $first: "$messageType" },
          lastContent: { $first: "$content" },
          lastFileUrl: { $first: "$fileUrl" },
        },
      },

      // Join peer profile
      {
        $lookup: {
          from: User.collection.name, // "users"
          localField: "_id",
          foreignField: "_id",
          as: "contact",
        },
      },
      { $unwind: "$contact" },

      // Final shape (keep _id as peerId if you want)
      {
        $project: {
          _id: 1, // peerId
          lastMessageTime: 1,
          lastMessageType: 1,
          lastContent: 1,
          lastFileUrl: 1,
          email: "$contact.email",
          firstName: "$contact.firstName",
          lastName: "$contact.lastName",
          color: "$contact.color",
          image: "$contact.image",
        },
      },

      // ✅ Ensure final ordering by last message
      { $sort: { lastMessageTime: -1 } },
    ]);

    return res.status(200).json({ contacts });
  } catch (e) {
    console.log(e);
    return res.status(500).send("Server Error");
  }
}




export async function getAllContacts(req,res){
   try{

      const users=await User.find({
        _id:{$ne:req.userId}
      },"_id email firstName lastName ")

      const contacts=users.map((user)=>{
        return{
        label:user.firstName?`${user.firstName} ${user.lastName}`:user.email,
        value:user._id
        }
      })

      // console.log(contacts);
      
      return res.status(200).json({
        contacts
      })
   }
     catch(e){
     console.log(e);
    //  console.log({e});
     return res.status(500).send("Server Error");
   }
}