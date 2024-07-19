const express=require ("express");
const connectDb=require("./db");
const app =express();
app.use(express.json());
connectDb();
app.listen(3000,()=>{
    console.log("Listeining on PORT : 3000");
});
