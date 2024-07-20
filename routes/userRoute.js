const express=require("express");
const userRouter=express.Router();
const User=require("../models/userModel");
const auth=require("../middlewares/auth");
const statusCheck=require("../middlewares/statusCheck");
userRouter.get("/user", auth , async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json({ ...user._doc, token: req.token });
    } catch (err) {
        res.status(500).json({error:err.message});      
    }

});
userRouter.post('/borrow',auth,statusCheck,async (req,res)=>{
    try{
        console.log("borrow");

        const {amount}=req.body;
        console.log(amount);
        if(!amount){
            return res.status(400).json("")
        }
        const userId=req.user;
        const user=await User.findById(userId);
        if(user.status!=="Approved"){
            return res.status(400).json({msg:"You can't borrow money..Application is rejected"});
        }
        res.json({status:user.status});

    }catch(err){
        res.status(500),json({error:err.message});
    }
});
module.exports=userRouter;