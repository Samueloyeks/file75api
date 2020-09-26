const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const BusinessNameService = require('../../Services/BusinessName');




exports.getBusinessName = (req, res, next) =>
  BusinessNameService.getBusinessNameDefault(req, res, next);


exports.reserveName = catchAsync(async (req, res, next) => {

  const newBusinessName = await BusinessNameService.createBusinessName(req.body);

  return res.status(200).json({
    status: 'success',
    data: {
      newBusinessName
    },
  });
});




