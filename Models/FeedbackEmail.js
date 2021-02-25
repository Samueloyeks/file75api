const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;


const FeedbackEmailsSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please provide shareholder email']
    },
    phone: {
        type: String,
    },
    body: {
        type: String,
        required: [true, 'Please provide message body'],
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    fullName:{
        type: String
    },
    category: {
        type: Schema.ObjectId,
    },
    submission: { 
        type: Schema.ObjectId,
    },
    assignedTo: {
        type: Schema.ObjectId,
        ref: 'Admin',
        required: [true, 'Please provide admin id'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'feedback_emails' });


const FeedbackEmails = mongoose.model('FeedbackEmails', FeedbackEmailsSchema);

module.exports = FeedbackEmails;
