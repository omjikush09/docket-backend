import passport from "passport";
import LocalStrategy from "passport-local"
import User from "../models/user";
import { validPassword } from "../controllers/auth";
// const LocalStrategy = require("passport-local").Strategy;

// const LocalStrategy=  new Strategy.Strategy();

const customFields={
    usernameField:"email",
    passwordField:"password"
}

// interface User{
//     name:String;
//     email:String;
//     encry_passward:String;
//     upcomingEvent:Types.ObjectId
//     salt:String;
// }

const verifyCallback= async (email:string,password:string,done:CallableFunction)=>{




User.findOne({email:email})
    .then((user:any)=>{
        if(!user){return done(null,false)} // null for their is no error and false is  for authentication
        const isValid= validPassword(password,user.encry_passward,user.salt);
        if(isValid){
            return done(null,user);
        }else{
            return done(null,false);
        }
        
    }) 
    .catch((err:Error)=>{
        done(err);
    })
}

const strategy = new LocalStrategy.Strategy(customFields,verifyCallback);
passport.use(strategy);

passport.serializeUser(function(user:any, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.email });
    });
  });
  
passport.deserializeUser(function(user:any, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });