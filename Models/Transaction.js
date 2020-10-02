const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: {
        type: String,
        required: [true, 'Please provide an amount'],
    },
    provider: {
        type: String,
        required: [true, 'Please provide a payment service provider'],
    },
    reference: {
        type: String, 
        required: [true, 'Please provide a payment reference'],
    },
    status: {
        type: String,
        required: [true, 'Please provide payment status'],
    },
    userId: {
        type: String,
        required: [true, 'Please provide user id'],
    },
    service: {
        type: String,
        required: [true, 'Please provide a service'],
    },
    serviceId: {
        type: String,
        required: [true, 'Please provide service id'],
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


const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
