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
    await commentScheme.deleteOne({ _id: commentId });
    return { message: "comment deleted" };
}


const updateComment = async (id, data) => {
    const newdata = await commentScheme.findByIdAndUpdate(id, data);
    return newdata;
}


module.exports = { createComment, getComments, deleteComment, updateComment };