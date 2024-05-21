const router = require('express').Router();
const userController = require('../Controllers/user.controller');

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const result = await userController.createUser(data);
        res.status(200).send(result);
    } catch (err) {
        res.status(409).send(err);
        console.log(err)
    }
});


router.post('/:userid', async (req, res) => {
    const __id = req.params.userid;
    const userinfo = await userController.getUser(__id);
    res.send(userinfo);
});

module.exports = router;