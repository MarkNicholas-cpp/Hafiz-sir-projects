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

module.exports = { createPost, getAllPosts }