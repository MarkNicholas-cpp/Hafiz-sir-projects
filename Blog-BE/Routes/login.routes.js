const router   =  require('express').Router();
const user     = require('../Models/user.model');
const  tokenized        = require("../middleware/jwtsign");
const {getAllPosts} = require("../Controllers/post.controller");

router.post('/',async (req,res)=>{
  console.log('request received');
  const userDetails = req.body;
  console.log(userDetails);
  if(!userDetails){
    res.sendStatus(401);
  }
  const {email,password,role} =  userDetails;
  const fetchuser = await user.find({email:email});
  console.log(fetchuser)
  if(!fetchuser[0]){
    res.status(403).json({status:"user not found"});
  }
  else if (password !== fetchuser[0].password){
    res.status(403).json({status:"password not matched"})
  }
  else{
 const getAlldata =  await getAllPosts();
 const  {signed,payload}     =  await tokenized(email,role,{id:fetchuser.__id});
 res.status(200).json({token:signed,payload});
}

})

module.exports = router;
