const express=require("express");
const userRouter=express.Router();
const User=require("../models/userModel");
const auth=require("../middlewares/auth");
userRouter.get("/user", auth, async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json({ ...user._doc, token: req.token });
    } catch (err) {
        res.status(500),json({error:err.message});
        
    }

});
userRouter.get('/borrow',auth,async (req,res)=>{
    try{
        const userId=req.user;
        console.log(userId);
        res.json("Lol");
    }catch(err){
        res.status(500),json({error:err.message});
    }
});
module.exports=userRouter;