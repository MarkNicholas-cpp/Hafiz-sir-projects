const router = require('express').Router();
const userController = require('../Controllers/user.controller');

router.post('/', async (req, res) => {
    const data = req.body;
    const result = await userController.createUser(data);
    res.send(result);
});
module.exports = router;    