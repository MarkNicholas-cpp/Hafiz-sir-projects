const jwt = require('jsonwebtoken');
const secret = "iamanidiot";

const authtoken = async (req,res,next)=>{
    console.log(req.headers.authorization);
    const tokenHeader = req.headers['authorization']?.split(' ')[1];
    if(!tokenHeader){
     return res.sendStatus(401);
    }

     jwt.verify(tokenHeader,secret,(err,user)=>{
        if(err) return res.sendStatus(403);
        req.body.userId=user.userId;
        console.log(req.body);
        next();
    })
}


const adminchecker = (req,res,next)=>{
    if(req.user.role !== 'admin') return res.sendStatus(403);
    next();

}

module.exports = {authtoken,adminchecker};