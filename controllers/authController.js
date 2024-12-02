const User = require("../models/user") ;
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async (req,res) => {
 const {first_name, last_name, email, password, re_password, phone_number, role} = req.body ;
 if(!first_name || ! last_name || ! email || ! password || ! re_password|| ! phone_number ) {
    return res.status(400).json({message: "All fields are required "}) ;

 }
 try {
    const duplicatedEmail = await User.findOne({email}).exec() ;
    if(duplicatedEmail) {
        return res.status(409).json({message : "User already exists"}) ;
    }


        if (  password !== re_password) {
            return res.status(400).json({ error: 'Passwords do not match.' });
        } 
    

    const userRole = role === 1 ? 1 : 0;

   const hashedPassword = await bcrypt.hash(password,10) ;
   await User.create({
    first_name , 
    last_name ,
    email ,
    password : hashedPassword ,
    phone_number ,
    role : userRole ,
   }) ;
   return res.status(201).json({message : "user create successfully"}) ;
  
} catch (error) {
    console.error(error) ;
    return res.status(500).json({message : "server error"});

}
}


const login = async (req,res) => {
    const {email, password} = req.body ;
    if (!email || !password) {
       return res.status(400).json({message: "All fields are required "}) ;
    }
    
       const foundedUser = await User.findOne({email}).exec() ;
       
       if (!foundedUser) {
            return register.status(401).json({message: "User does not exist"}) ;
   
        }
        const isMatch = await bcrypt.compare(password , foundedUser.password) ; 
        if (!isMatch) {
           return res.status(401).json({message : "wrong password" })
       }
       const accessToken = jwt.sign({
           userInfo : {
               id:foundedUser._id 
           }
   
       }, process.env.ACCESS_TOKEN_SECRET,{expiresIn:"7d"})
       res.status(200).send({ accessToken, id: foundedUser._id, email: foundedUser.email, phone_number : foundedUser.phone_number })
    }

    module.exports = { register , login}