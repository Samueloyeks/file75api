const mongoose = require('mongoose');

const SubmissionStatusesSchema = new mongoose.Schema({
    id: {
        type: String
    },
    code: {
        type: String
    },
    status: {
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
},{ collection: 'submission_statuses' });


const SubmissionStatuses = mongoose.model('SubmissionStatuses', SubmissionStatusesSchema);

module.exports = SubmissionStatuses;
