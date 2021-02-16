const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const BusinessNaturesOfBusinessService = require('../../Services/BusinessNaturesOfBusiness');



exports.getBusinessNatureOfBusiness= catchAsync(async (req, res, next) => {
  const result = await BusinessNaturesOfBusinessService.getAllBusinessNaturesOfBusiness(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});




