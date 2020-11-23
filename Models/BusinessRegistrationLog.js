const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const BusinessRegistrationLogSchema = new mongoose.Schema({
    id: {
        type: String
    },
    businessRegistration: {
        type: Schema.ObjectId,
        ref: 'BusinessRegistration',
        required: true,
    },
    comment: {
        type: Schema.ObjectId,
        ref: 'Comment',
        required: true,
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true,
    },
    admin: {
        type: Schema.ObjectId,
        ref: 'Admin',
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'business_registration_logs' });


const BusinessRegistrationLog = mongoose.model('BusinessRegistrationLog', BusinessRegistrationLogSchema);

module.exports = BusinessRegistrationLog;
