const postSchema = require('../Models/post.model');

async function createPost(post) {
    const newPost = new postSchema(post);
    await newPost.save();
    return newPost;
}

async function getAllPosts() {
    const posts = await postSchema.find();
    return posts;
}
async function getPostById(id) {
    const post = await postSchema.findOne({ _id: id })
    return post;
}
async function deletePostById(id) {
    try {
        await postSchema.findOneAndDelete({ _id: id })
        return { message: `Post deleted successfully` }
    } catch (err) {
        return err
    }
}
async function updatePostById(id, data) {
    try {
        await postSchema.findOneAndUpdate({ _id: id }, data)
        return { message: `Post updated successfully` }
    } catch (err) {
        return err
    }
}

module.exports = { createPost, getAllPosts, getPostById, deletePostById, updatePostById }