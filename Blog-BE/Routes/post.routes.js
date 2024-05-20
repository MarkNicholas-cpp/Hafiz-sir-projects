const router = require('express').Router();
const categoryController = require('../Controllers/category.controller');
const postController = require('../Controllers/post.controller');

router.get('/', (req, res) => {
    res.send("/post")
})

router.post('/', async function (req, res) {
    try {
        const post = req.body;
        const category = post.category;
        post.categoryId = await categoryController.getCategoryIdByName(category);
        const result = await postController.createPost(post);
        res.send(result);
    } catch (err) {
        res.send(err);
    }
});

router.get('/getPostById/:postid', async function (req, res) {
    try {
        const _id = req.params.postid;
        const post = await postController.getPostById(_id);
        if (!post) {
            res.status(401).json({ err: 'post not found' })
        }
        console.log(post)
        res.status(200).json(post)
    }
    catch (err) {
        res.send(err);
    }
})



router.get('/getAllPosts', function (req, res) {
    postController.getAllPosts().then(result => {
        res.send(result);
    }).catch(err => {
        res.send(err);
    })
});

router.delete('/deletePost/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const result = await postController.deletePostById(id);
        res.status(200).send(result);
    } catch (err) {
        res.status(409).send(err);
        console.log(err)
    }
});

router.put('/updatePost/:id', async function (req, res) {
    try {
        const id = req.params.id;
        const post = req.body;
        await postController.updatePostById(id, post);
        res.status(200).send({ message: "Updated Successfully" });
    } catch (err) {
        res.status(409).send(err);
    }
});

module.exports = router;