import { User } from "../models/UserModel.js";

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