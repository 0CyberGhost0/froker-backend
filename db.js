const mongoose=require ("mongoose");
const mongoDbUrl="mongodb+srv://admin:ved1234@froker-backend.avy3910.mongodb.net/?retryWrites=true&w=majority&appName=froker-backend";
const connectDb=async()=>{
    mongoose.connect(mongoDbUrl).then(()=>{
        console.log("Database Connected");
    }).catch((e)=>{
        console.log(e);
    });
}
module.exports=connectDb;