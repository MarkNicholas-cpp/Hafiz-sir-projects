
const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    reply: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'reply'
    }]
})
const Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;