require ("dotenv").config();
// console.log(process.env.NODE_ENV);
const mongoose = require('mongoose');
const express = require ("express");
const path = require('path');
const uploadRoutes = require('./routes/uploadRoutes');
const app = express();
const connectDB = require("./config/db.config");
connectDB();
const PORT = process.env.PORT || 5000;

var fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors({
    origin:'http://localhost:5000',
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


//app.use("/",require('.routes/root'));
app.get("/",require('./routes/rout'));
app.use("/auth",require('./routes/authRoutes'));
app.use("/users",require('./routes/userRoutes'));
app.use("/products",require('./routes/productRoutes'));
app.use("/api",require('./routes/uploadRoutes'));


/*function GenerateProducts  (count = 100) {
    const categories = ["Automotive","Beauty","Home","Sports","Pets","Toys","Garden"]
    const products = [];
    for (let i=1; i<count; i++){
        products.push({
            id : i,
            name : `Product ${i}`, 
            categorie : categories[Math.floor(Math.random()*categories.length)], // interpreter un nombre enter 0 et 7 pour choisir la categorie de la numero choisi 
            price : parseFloat((Math.random()*100 + 1).toFixed(2)),
            stock : Math.floor((Math.random()*100)),
            rating : parseFloat((Math.random()*5).toFixed(1)),
        })
    }
    return products;
}

const products = GenerateProducts();
fs.writeFileSync('products.json' , JSON.stringify(products, null,), 'utf-8')
console.log("generating products")


//file managment system 
*/
mongoose.connection.once('open',()=>{
    console.log('connected to the db');
    app.listen(PORT,()=>{
    console.log(`server in running on http://localhost:${PORT}/ `);
});

})