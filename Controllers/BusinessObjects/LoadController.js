const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const BusinessObjectsService = require('../../Services/BusinessObjects');



exports.getBusinessObjects = catchAsync(async (req, res, next) => {
  const result = await BusinessObjectsService.getAllBusinessObjects(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});




