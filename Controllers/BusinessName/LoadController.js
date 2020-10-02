const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const BusinessNameService = require('../../Services/BusinessName');
const userService = require('../../Services/User');
const Transaction = require('../Transaction/LoadController');




exports.getBusinessName = (req, res, next) =>
  BusinessNameService.getBusinessNameDefault(req, res, next);


exports.reserveName = catchAsync(async (req, res, next) => {
  const user = await userService.getUser({
    email: req.body.email,
  });

  req.body.userId = user._id;
  const TransactionData = req.body.transactionData;

  req.body.transactionData = null;
  const newBusinessName = await BusinessNameService.createBusinessName(req.body);

  TransactionData.userId = user._id;
  TransactionData.service = 'Name Reservation';
  TransactionData.serviceId = newBusinessName._id;

  req.body = TransactionData;

  Transaction.saveTransaction(req);

  return res.status(200).json({
    status: 'success',
    data: {
      newBusinessName
    },
  });
});




