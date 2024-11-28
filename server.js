require ("dotenv").config();
// console.log(process.env.NODE_ENV);
const mongoose = require('mongoose');
const express = require ("express");
const app = express();
const connectDB = require("./config/db.config");
connectDB();
const PORT = process.env.PORT || 5000;


const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cors({
    origin:'http://localhost:5000',
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());

//app.use("/",require('.routes/root'));
app.get("/",require('./routes/rout'));
app.use("/auth",require('./routes/authRoutes'));
app.use("/users",require('./routes/userRoutes'));


mongoose.connection.once('open',()=>{
    console.log('connected to the db');
    app.listen(PORT,()=>{
    console.log(`server in running on http://localhost:${PORT}/ `);
});

})