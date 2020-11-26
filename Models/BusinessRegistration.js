const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');



const BusinessRegistrationSchema = new Schema({
    corporateName: {
        type: String,
        // required: [true, 'Please provide corporate name!'],
    },
    companyNo: {
        type: String,
        // required: [true, 'Please provide company number!'],
    },
    businessName1: {
        type: String,
        required: [true, 'Please provide business name!'],
    },
    businessName2: {
        type: String,
        required: [true, 'Please provide second business name!'],
    },
    type: {
        type: String,
        required: [true, 'Please provide registration type!'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone Number'],
    },
    availabilityCode: {
        type: String,
        required: [true, 'Please provide availability code'],
    },
    fullName: {
        type: String,
        required: [true, 'Please provide name'],
    },
    companyDesignation: {
        type: String,
        // required: [true, 'Please provide designation'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide signature'],
    },
    charge: {
        type: String,
        required: [true, 'Please provide service charge'],
    },
    principalAddress: {
        type: String,
        // required: [true, 'Please provide principal address'],
    },
    branchAddress: {
        type: String,
        // required: [true, 'Please provide branch address'],
    },
    businessCategory: {
        type: String,
        // required: [true, 'Please provide business type'],
    },
    surname: {
        type: String,
        // required: [true, 'Please tell us your surname!'],
    },
    age: {
        type: Number,
        // required: [true, 'Please provide age!'],
    },
    sex: {
        type: String,
        // required: [true, 'Please tell us your sex!'],
    },
    address: {
        type: String,
        // required: [true, 'Please provide address'],
    },
    occupation: {
        type: String,
        // required: [true, 'Please provide occupation'],
    },
    nationality: {
        type: String,
        // required: [true, 'Please provide nationality'],
    },
    state: {
        type: String,
        // required: [true, 'Please provide state'],
    },
    city: {
        type: String,
        // required: [true, 'Please provide city'],
    },
    passport: {
        type: String,
        // required: [true, 'Please provide passport'],
    },
    email: {
        type: String,
        required: [true, 'Please provide user email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    user: {
        // type: String,
        // required: [true, 'Please provide user id'],
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user id'],
    },
    status: {
        type: Schema.ObjectId,
        ref: 'SubmissionStatuses',
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'ServiceCategories',
        required: true
    },
    assignedTo: {
        type: Schema.ObjectId,
        ref: 'Admin',
        required: [true, 'Please provide admin id'],
    },
    adminStatus: {
        type: Schema.ObjectId,
        ref: 'AdminStatuses',
        required: true,
    },
    designation: {
        type: String,
        required: [true, 'Please provide a designation'],
    },
    submitted: Date,
    expires: Date,
    viewed: Boolean,
    responseFiles: [String],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'business_registrations' });

BusinessRegistrationSchema.index({
    'corporateName': 'text',
    'businessName1': 'text',
    'businessName2': 'text',
    'email': 'text'
});

BusinessRegistrationSchema.plugin(mongoosePaginate);



const BusinessRegistration = mongoose.model('BusinessRegistration', BusinessRegistrationSchema);

module.exports = BusinessRegistration;
