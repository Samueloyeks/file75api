const mongoose = require('mongoose');

const AdminStatusesSchema = new mongoose.Schema({
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
},{ collection: 'admin_statuses' });


const AdminStatuses = mongoose.model('AdminStatuses', AdminStatusesSchema);

module.exports = AdminStatuses;
