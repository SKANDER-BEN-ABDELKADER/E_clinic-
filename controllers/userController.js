const user = require("../models/user");



const getUsers = async (req,res) => {
    const users = await user.find().select("-password").lean();
    if (!users.length){
        return res.status(400).json({Message:"No user found !"})
    }
    res.json(users);    
};

const getUserById = async (req,res) => {
    const {id} = req.params;
    const users = await user.findById(id);
    if (!users){
        return res.status(400).json({Message:"No user found !"})
    }
    res.json(users);
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const updates = req.body
    const updatedUsers = await user.findByIdAndUpdate(id, updates, {new:true}).select("-password").lean();

    if (updates.password){
        updates.password = await bcrypt.hash(updates.password,10)
    }

    if (!updatedUsers){
        return res.status(400).json({Message:"User not found !"})
    }
    res.json(updatedUsers);
}

const deleteUser = async (req, res) => {
    const {id} = req.params;
    const deleteUser = await user.findByIdAndDelete(id);


    if (!deleteUser){
        return res.status(400).json({Message:"User not found !"})
    }
    res.json({Message:`${deleteUser.first_name} is successfully deleted !`});

}

const searchUser = async (req, res) => {
    const searchC = req.params
    const searchUser = await user.find
}


module.exports = {getUsers, getUserById, updateUser, deleteUser, searchUser}