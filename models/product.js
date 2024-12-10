const mongoose = require ('mongoose');

const productSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    categorie:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    sotck:{
        type:Number,
        required: true 
    },
    rating:{
        type:Number,
        required: true 
    },
},{timestamps:true})

module.exports = mongoose.model("Product",productSchema);