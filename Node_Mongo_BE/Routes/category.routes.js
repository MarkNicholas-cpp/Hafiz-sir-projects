const router = require('express').Router();
const categoryController = require('../Controllers/category.controller');
router.get('/', (req, res) => {
    res.send("/category");
})
router.post('/', async function (req, res) {
    try {
        const category = req.body;
        const result = await categoryController.createCategory(category);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
})
module.exports = router