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
    role:{
        type:String,
        enum: ['doctor', 'patient'],
        required:true
    },
    verified: { 
        type: Boolean, 
        default: false 
    },
    CIN:{
        type:Number,
        required:function () { return this.role === 'doctor'; }
    },
    medical_diploma:{
        type:String,  // Store the file path or URL as a string
        required:function () { return this.role === 'doctor'; }

    },
    proof_of_practice:{
        type:String,
        required:function () { return this.role === 'doctor'; }

    },
    MCRN:{
        type:Number,
        required:function () { return this.role === 'doctor'; }

    },
    
},{timestamps:true})

module.exports = mongoose.model("User",userSchema);