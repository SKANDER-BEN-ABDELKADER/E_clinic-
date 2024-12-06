const mongoose = require ('mongoose');
const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone_number:{
        type:Number,
        required:true
    },
    role: { 
        type: Number,
        default: 0 
    },
    
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);