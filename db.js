const mongoose=require ("mongoose");
require("dotenv").config();
const mongoDbUrl=process.env.mongoDBURL;
const connectDb=async()=>{
    mongoose.connect(mongoDbUrl).then(()=>{
        console.log("Database Connected");
    }).catch((e)=>{
        console.log(e);
    });
}
module.exports=connectDb;