const express=require("express");
const authRouter=express.Router;
authRouter.post('/signup',async (req,res)=>{
    try{
        

    }catch(e){
        res.status(500).json(error:e.message);
    }
})
module.exports=authRouter;