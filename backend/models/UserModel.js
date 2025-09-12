import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";

const userSchema= new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please provide your email'],
        unique:true,
    },
    password:{
        type:String,
        required:[true, 'Password required'],
        minLength:[6, 'Password should be atleast of length 6']
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false
    },
    color:{
        type:Number,
        required:false,
    },

    profileSetup:{
      type:Boolean,
      default:false,
    }

})

//applying a middleware before saving
//
userSchema.pre("save",async function (next){
    //skip if password is not modified
    // if (!this.isModified("password")) return next();
    const salt = await genSalt();
    this.password=await hash(this.password,salt);
    next();
});

export const User=mongoose.model("Users",userSchema);
// exports.User={User};
//export default User

