import express from "express";
import passport from "passport";
import { signup } from "../controllers/auth";

const router =express.Router();




router.post("/sigup/password",signup)

router.post("/sigin/password",passport.authenticate('local',{failureRedirect:"/api/login-failure",successRedirect:"login-success"}))



//Login failure route
router.get("/login-failure",(req:any,res:any)=>{
    res.status(401).json({error:"Email or Password is wrong"})}
)

//Login Successful route
router.get("/sigin/login-success",(req:any,res:any)=>{
    res.status(200).json({success:"Login  successfull"})}
)
export default router;