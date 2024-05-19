const router = require('express').Router();
const commentController = require('../Controllers/comments.controllers');

router.post('/', async function (req, res) {
    try {
        const comment = req.body;
        const result = await commentController.createComment(comment);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
})
router.get('/?postId=:postId&parentId=:parentId', async function (req, res) {
    try {
        const postId = req.query.postId;
        const parentId = req.query.parentId;
        if (parentId) {
            const result = await commentController.getComments(postId, parentId);
            res.send(result);
        } else {
            const result = await commentController.getComments(postId);
            res.send(result);
        }
    } catch (err) {
        res.send(err);
    }
})

router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const result = await commentController.deleteComment(id);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
})

module.exports = router;