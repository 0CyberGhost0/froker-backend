const express=require ("express");
const connectDb=require("./db");
const authRouter = require("./routes/authRoute");
const userRouter=require("./routes/userRoute");
require("dotenv").config;
const PORT=process.env.PORT || 3000;
const app =express();
app.use(express.json());
connectDb();
app.use('/',authRouter);
app.use('/',userRouter);
app.listen(PORT,()=>{
    console.log("Listeining on PORT :", PORT);
});
