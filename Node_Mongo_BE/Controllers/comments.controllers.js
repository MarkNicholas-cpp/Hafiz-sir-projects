const commentScheme = require("../Models/comments.model");

const createComment = async (comment) => {
    const newComment = new commentScheme(comment);
    await newComment.save();
    return newComment;
};

const getComments = async (postId) => {
    const comments = await commentScheme.find({ postId: postId });
    return comments;
}

const deleteComment = async (commentId) => {
    return await commentScheme.deleteOne({ _id: commentId });
}

module.exports = { createComment, getComments, deleteComment };