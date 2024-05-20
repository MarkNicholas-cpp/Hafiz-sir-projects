const router = require('express').Router();
const userController = require('../Controllers/user.controller');

router.post('/', async (req, res) => {
    const data = req.body;
    console.log(data)
    const result = await userController.createUser(data);
    res.send(result);
});


router.post('/:userid',async (req,res)=>{
 const __id = req.params.userid;
 const userinfo = await userController.getUser(__id);
 res.send(userinfo);
});

module.exports = router;