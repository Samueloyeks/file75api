const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const TransactionService = require('../../Services/Transaction');




exports.getTransaction = (req, res, next) =>
    TransactionService.getTransactionDefault(req, res, next);


exports.saveTransaction = catchAsync(async (req, res, next) => {

    const newTransaction = await TransactionService.createTransaction(req.body);

    return;
    // return res.status(200).json({
    //     status: 'success',
    //     data: {
    //         newTransaction
    //     },
    // });
});




