const express=require("express");
const moment=require("moment");
const validateUser=(dob,salary)=>{
    try {
        const birthDate = moment(dob, 'YYYY-MM-DD');
        const age = moment().diff(birthDate, 'years');
        console.log(age);
        if(age<=20){
            return {valid:false,msg:"User's age should be above 20"};
        }
        else if(salary<25000){
            return {valid:false,msg:"Salary should not be less than 25000"};
        }
        return {valid:true};
    } catch (err) {
        console.log(err);
        
    }
}
module.exports=validateUser;