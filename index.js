const express=require ("express");
const connectDb=require("./db");
const authRouter = require("./routes/authRoute");
const userRouter=require("./routes/userRoute");
const app =express();
app.use(express.json());
connectDb();
app.use('/',authRouter);
app.use('/',userRouter);
app.listen(3000,()=>{
    console.log("Listeining on PORT : 3000");
});
