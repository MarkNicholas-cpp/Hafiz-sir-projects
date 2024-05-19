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
    replay: [{
        userId:String,
        postId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
            required: true
        },
        comment:String,
        date:{
            type:Date,
            required: true,
            default:Date.now
        }
    }]
})
const Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;