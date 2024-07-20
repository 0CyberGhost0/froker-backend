const express=require("express");
const userRouter=express.Router();
const User=require("../models/userModel");
const auth=require("../middlewares/auth");
const statusCheck=require("../middlewares/statusCheck");
require("dotenv").config();
userRouter.get("/user", auth , async (req, res) => {
    try {
        const user = await User.findById(req.user);
        res.json({ ...user._doc, token: req.token });
    } catch (err) {
        res.status(500).json({error:err.message});      
    }

});
function calculateMonthlyRepayment(amount, interestRate, tenure) {
    const monthlyRate = interestRate / 12;
    const numerator = monthlyRate * Math.pow(1 + monthlyRate, tenure);
    const denominator = Math.pow(1 + monthlyRate, tenure) - 1;
    return amount * (numerator / denominator);
}
userRouter.post('/borrow',auth,statusCheck,async (req,res)=>{
    try{
        const {amount,tenure}=req.body;
        console.log(amount);
        if(!amount){
            return res.status(400).json("Enter Amount to borrow!");
        }
        if(!tenure){
            tenure=process.env.DEFAULT_TENURE;
        }
        const userId=req.user;
        const user=await User.findById(userId);
        user.purchasePower+=amount;
        const monthlyRepay=calculateMonthlyRepayment(amount,process.env.INTEREST_RATE,tenure);
        console.log(monthlyRepay);
        await user.save();
        res.status(400).json({
            purchasePower:user.purchasePower,
            montlyRepayment:monthlyRepay.toFixed(2)
        });
    }catch(err){
        console.log("inside borrow");
        res.status(500).json({error:err.message});
    }
});
module.exports=userRouter;