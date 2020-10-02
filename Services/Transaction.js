const jwt = require('jsonwebtoken');
const Transaction = require('../Models/Transaction');
const factory = require('../Helpers/handlerFactory');


exports.createTransaction = async (req) => {
    return await Transaction.create({
        amount: req.amount,
        provider: req.provider,
        reference: req.reference,
        status: req.status,
        userId: req.userId,
        service: req.service,
        serviceId: req.serviceId
    });
};

exports.getTransactionDefault = factory.getOne(Transaction);

exports.getTransaction = async (params) => {
    const query = User.findOne(params);
    return await query;
};


