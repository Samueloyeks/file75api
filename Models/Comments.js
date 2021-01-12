const mongoose = require('mongoose');

const CommentsSchema = new mongoose.Schema({
    id: {
        type: String
    },
    title: {
        type: String
    },
    code: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
},{ collection: 'comments' });


const Comments = mongoose.model('Comments', CommentsSchema);

module.exports = Comments;
