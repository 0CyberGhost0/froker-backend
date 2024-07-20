const express=require("express");
const bcrypt=require("bcryptjs");
const authRouter=express.Router();
const User=require('../models/userModel');
const jwt=require("jsonwebtoken");
const auth=require("../middlewares/auth");


authRouter.post('/signup',async (req,res)=>{
    try{
        const {name,email,password,phoneNumber,dob,salary}=req.body;
        if(!email || !password){
            return res.status(400).json({msg:"Email or Password can't be empty"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg:"User Already Exists!"});
        }
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const user=new User({
            name,
            email,
            password:hashedPassword,
            phoneNumber,
            dob,
            salary,
        });
        await user.save();
        res.json({msg:"User Created Successfully",user});
    }catch(e){
        res.status(500).json({error:e.message});
    }
});
authRouter.post('/login',async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:"User doesn't Exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({msg:"Incorrect Password"});
        }
        const token=jwt.sign({id:user._id},"password");
        res.json({token,...user._doc});

    } catch (error) {
        res.status(500).json({error:error.message});
        
    }
});
authRouter.get("/user", auth, async (req, res) => {
    const user = await User.findById(req.user);
    res.json({ ...user._doc, token: req.token });
});
module.exports=authRouter;