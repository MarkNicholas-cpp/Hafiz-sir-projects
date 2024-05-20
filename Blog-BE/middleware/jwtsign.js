const jwt = require('jsonwebtoken');
const userModel = require('../Models/user.model');
const secretkey = "iamanidiot";

const jwtsignin = async (email,role,{id:userid})=>{
  const user = await userModel.findOne({email:email})
  const userId = user._id;
 const signed   = jwt.sign({email:email,userId:userId,role:role},secretkey);
  return {signed:signed,payload:{email:email,userId:userId,role:role}};
}

module.exports = jwtsignin;