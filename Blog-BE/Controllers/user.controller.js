const User = require('../Models/user.model');

const createUser = async (userData) => {
    const user = new User(userData);
    await user.save();
    return user;
};

const getUser = async (__id)=>{
    const userinfo = await User.findOne(__id);
    return userinfo;
}

module.exports = {
    createUser,
    getUser
};