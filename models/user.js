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
    role:{
        type:[String],
        default : "user" ,
        // enum : ["user", "admin", "moderator"]
    },
    verified: { 
        type: Boolean, 
        default: false 
    },
    CIN:{
        type:Number,
    },
    medical_diploma:{
        type:File,
    },
    proof_of_practice:{
        type:File,
    },
    MCRN:{
        type:Number,
    },
    
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);