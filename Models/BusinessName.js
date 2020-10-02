const mongoose = require('mongoose');
const validator = require('validator');


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
    charge: {
        type: String,
        required: [true, 'Please provide service charge'],
    },
    email: {
        type: String,
        required: [true, 'Please provide user email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
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
