const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const CompanyRegistrationLogSchema = new mongoose.Schema({
    id: {
        type: String
    },
    companyRegistration: {
        type: Schema.ObjectId,
        ref: 'CompanyRegistration',
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
}, { collection: 'company_registration_logs' });


const CompanyRegistrationLog = mongoose.model('CompanyRegistrationLog', CompanyRegistrationLogSchema);

module.exports = CompanyRegistrationLog;
