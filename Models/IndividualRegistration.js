const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');



const IndividualRegistrationSchema = new Schema({
    businessName1: {
        type: String,
        required: [true, 'Please provide business name!'],
    },
    businessName2: {
        type: String,
        required: [true, 'Please provide second business name!'],
    },
    availabilityCode: {
        type: String,
        required: [true, 'Please provide availability code'],
    },
    principalAddress: {
        type: String,
        required: [true, 'Please provide principal address'],
    },
    branchAddress: {
        type: String,
        // required: [true, 'Please provide branch address'],
    },
    businessCategory: {
        type: String,
        required: [true, 'Please provide business type'],
    },
    fullName: {
        type: String,
        required: [true, 'Please tell us your name!'],
    },
    surname: {
        type: String,
        required: [true, 'Please tell us your surname!'],
    },
    age: {
        type: Number,
        required: [true, 'Please provide age!'],
    },
    sex: {
        type: String,
        required: [true, 'Please tell us your sex!'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone Number'],
    },
    email: {
        type: String,
        required: [true, 'Please provide user email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    address: {
        type: String,
        required: [true, 'Please provide address'],
    },
    occupation: {
        type: String,
        required: [true, 'Please provide occupation'],
    },
    nationality: {
        type: String,
        required: [true, 'Please provide nationality'],
    },
    state: {
        type: String,
        required: [true, 'Please provide state'],
    },
    city: {
        type: String,
        required: [true, 'Please provide city'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide signature'],
    },
    passport: {
        type: String,
        required: [true, 'Please provide passport'],
    },
    charge: {
        type: String,
        required: [true, 'Please provide service charge'],
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
}, { collection: 'individual_registrations' });

IndividualRegistrationSchema.index({
    'businessName1': 'text',
    'businessName2': 'text',
    'email': 'text'
});

IndividualRegistrationSchema.plugin(mongoosePaginate);



const IndividualRegistration = mongoose.model('IndividualRegistration', IndividualRegistrationSchema);

module.exports = IndividualRegistration;
