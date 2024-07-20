const express=require("express");
const User = require("../models/userModel");
const statusCheck= async(req,res,next)=>{
    try {
        // console.log("inside status check");
        const userId=req.user;
        const user=await User.findById(userId);
        console.log(userId);
        if(user.status!='Approved'){
            return res.status(400).json("Your Application Aprroval is Pending!");
        console.log("inside status check");

        }
        next();
    } catch (e) {
        res.status(500).json({error:e.message});
    }
}
module.exports=statusCheck;