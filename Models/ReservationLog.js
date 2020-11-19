const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

const ReservationLogSchema = new mongoose.Schema({
    id: {
        type: String
    },
    reservation: {
        type: Schema.ObjectId,
        ref: 'Reservation',
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
}, { collection: 'reservation_logs' });


const ReservationLog = mongoose.model('ReservationLog', ReservationLogSchema);

module.exports = ReservationLog;
