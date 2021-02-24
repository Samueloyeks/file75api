const mongoose = require('mongoose');

const FaqSchema = new mongoose.Schema({
    id: {
        type: String
    },
    question: {
        type: String
    },
    answer: {
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
}, { collection: 'faq' });


const Faq = mongoose.model('Faq', FaqSchema);

module.exports = Faq;
