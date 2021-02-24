const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const FaqService = require('../../Services/Faq');



exports.getFaq= catchAsync(async (req, res, next) => {
  const result = await FaqService.getAllFaq(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});




