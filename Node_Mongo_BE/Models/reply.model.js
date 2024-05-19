const mongoose = require('mongoose')
const replySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
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
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'reply'
        }
    ]
});

const replyComments = mongoose.model('reply', replySchema);

module.exports = replyComments  