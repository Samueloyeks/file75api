const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TransactionService = require('../../Services/Transactions');


exports.getTransaction = (req, res, next) =>
    TransactionService.getTransactionDefault(req, res, next);

// show all transactions 
// GET transactions
exports.index = catchAsync(async (req, res, nexr) => {

});

// save a new transaction 
// POST transactions 
exports.store = catchAsync(async (req, res, next) => {
    const newTransaction = await TransactionService.createTransaction(req.body);

    return;
    // return res.status(200).json({
    //     status: 'success',
    //     data: {
    //         newTransaction
    //     },
    // }); 
});

// get a single transaction 
// POST transactions/:_id
exports.show = catchAsync(async (req, res, nexr) => {

});

// update transaction details
// PUT or PATCH transactions/:_id
exports.update = catchAsync(async (req, res, nexr) => {

});

// delete transaction with id
// DELETE transactions/:_id
exports.destroy = catchAsync(async (req, res, nexr) => {

});




