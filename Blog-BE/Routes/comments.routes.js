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
});

router.get('/:postId', async function (req, res) {
    try {
        const postId = req.params.postId;
        const result = await commentController.getComments(postId);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.delete('/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const result = await commentController.deleteComment(id);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
})


router.put("/:id",async function(req,res){
    try{
       const id = req.params.id;
       const data = req.body;
       const updatedComment = await commentController.updateComment(id,data);
     res.send(updatedComment);
    }
    catch(err){
        res.send(err);
    }

})

module.exports = router;