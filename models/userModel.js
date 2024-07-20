const mongoose=require ("mongoose");
const userSchema=mongoose.Schema({
    phoneNumber:{
        required:true,
        type:String,
    },
    name: {
        required: true,
        type: String,
        trim: true,
    },
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
          validator: (value) => {
            const re =
              /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            return value.match(re);
          },
          message: "Please enter a valid email address",
        },
      },
      password: {
        required: true,
        type: String,
      },
      dob:{
        type:Date,
        required:true,
      },
      regDate:{
        type:Date,
        default:Date.now,
      },
      salary:{
        type:Number,
        required:true,
      },
      purchasePower:{
        type:Number,
        default:0,
      },
      status:{
        type:String,
        default:"Pending",
      },
});
const User=mongoose.model('User',userSchema);
module.exports=User;