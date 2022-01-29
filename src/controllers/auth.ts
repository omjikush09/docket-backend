import passport from "passport";
import LocalSrategy=require("passport-local");
import User from "../models/user";
import crypto from "crypto"





export const genPassword=(password:string)=>{
    const salt=crypto.randomBytes(32).toString('hex');
    const genHash=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex')
    return {salt,genHash}
}

export const validPassword=(password:string,hash:string,salt:string)=>{
    console.log(salt)
    const hashVerify=crypto.pbkdf2Sync(password,salt,10000,64,'sha512').toString('hex');
    return hash===hashVerify;
}


export const  signup=(req:any,res:any)=>{
    
   
    const saltAndHash=genPassword(req.body.password)
    const user = new User({
      email:req.body.email,
      salt:saltAndHash.salt,
      encry_passward:saltAndHash.genHash,
      name:req.body.name
    })
    user.save((err:any,user:any)=>{
        if(err){
            console.log(err)
            res.status(400).json({error:err});
        }else{
            console.log(user)
            res.json({message:"Sign Up Successfully"})
            
        }
    })
    
};






