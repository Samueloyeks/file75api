const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const ServiceCategoryService = require('../../Services/ServiceCategories');




exports.getserviceCategory = (req, res, next) =>
ServiceCategoryService.getServiceCategoryDefault(req, res, next);

// show all serviceCategories
// GET serviceCategories
exports.index = catchAsync(async (req, res, next) => {
  var result = await ServiceCategoryService.getAllServiceCategories(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});

// save a new serviceCategory 
// POST serviceCategories 
exports.store = catchAsync(async (req, res, next) => {

});

// get a single serviceCategory 
// GET serviceCategories/:id
exports.show = catchAsync(async (req, res, next) => {
  const result = await ServiceCategoryService.getServiceCategory(req.params);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});

// update serviceCategory details
// PUT or PATCH serviceCategories/:id
exports.update = catchAsync(async (req, res, next) => {

});

// delete serviceCategory with id
// DELETE serviceCategories/:id
exports.destroy = catchAsync(async (req, res, next) => {

});

exports.userserviceCategoriess = catchAsync(async (req, res, next) => {

});


