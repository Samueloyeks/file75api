const jwt = require('jsonwebtoken');
const Transaction = require('../Models/Transaction');
const factory = require('../Helpers/handlerFactory');


exports.createTransaction = async (req) => {
    return await Transaction.create({
        amount: req.amount,
        provider: req.provider,
        reference: req.reference,
        status: req.status,
        user: req.user,
        service: req.service
    });
};

exports.getTransactionDefault = factory.getOne(Transaction);

exports.getTransaction = async (params) => {
    const query = User.findOne(params);
    return await query;
};


