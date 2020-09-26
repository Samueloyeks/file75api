const mongoose = require('mongoose');

const BusinessNameSchema = new mongoose.Schema({
    companyName1: {
        type: String,
        required: [true, 'Please provide company name!'],
    },
    companyName2: {
        type: String,
        required: [true, 'Please provide second company name!'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone Number'],
    },
    userId: {
        type: String,
        required: [true, 'Please provide user id'],
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
});


const BusinessName = mongoose.model('BusinessName', BusinessNameSchema);

module.exports = BusinessName;
