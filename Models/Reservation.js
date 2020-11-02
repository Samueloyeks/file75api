const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');



const ReservationSchema = new Schema({
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
    responseFiles:[String],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'reservations' });
ReservationSchema.index({ 'companyName1': 'text', 'companyName2': 'text', 'email': 'text' });
ReservationSchema.plugin(mongoosePaginate);



const Reservation = mongoose.model('Reservation', ReservationSchema);

module.exports = Reservation;
