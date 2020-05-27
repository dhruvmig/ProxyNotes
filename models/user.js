const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true
    },
    resetNo:{
        type:Number
    }
})

const User=mongoose.model('User',userSchema);
module.exports=User;