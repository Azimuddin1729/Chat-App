//verfying token for gettign access to userinfo route

import jwt from "jsonwebtoken";
export const checkToken=(req,res,next)=>{
    // console.log(req.cookies)
    const token= req.cookies.jwt;

    // console.log(token);
    if(!token){
        return res.status(401).send("You are not authorised to see this page");
    }
    try{
       const decode=jwt.verify(token,process.env.JWT_SECRETKEY);
       req.userId=decode.userId;
       next();
    }
    catch(e){
      return res.status(403).send("Token is invalid");
      console.log(e);
    }
}