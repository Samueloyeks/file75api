const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ArticlesOfAssociationService = require('../../Services/ArticlesOfAssociation');
const { downloadArticle } = require('../../Middleware/Download');



exports.index = catchAsync(async (req, res, next) => {
  const result = await downloadArticle();

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
}); 




