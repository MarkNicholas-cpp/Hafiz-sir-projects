const commentScheme = require("../Models/comments.model");

const createComment = async (comment) => {
    const newComment = new commentScheme(comment);
    await newComment.save();
    return newComment;
};

const getComments = async (postId, parentId = null) => {
    const comments = await commentScheme.find({ postId: postId, parentId: parentId });
    return comments;
}

const deleteComment = async (commentId) => {
    
    commentScheme.deleteOne({ _id: commentId });
}

module.exports = { createComment, getComments };