const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const feedbackEmailService = require('../../Services/FeedbackEmail');
const userService = require('../../Services/User');
const ServiceCategoryService = require('../../Services/ServiceCategories');
const SubmissionStatusService = require('../../Services/SubmissionStatuses');
const AdminStatusService = require('../../Services/AdminStatuses');
const DesignationService = require('../../Services/Designations');
const AdminService = require('../../Services/Admin');
const Comments = require('../../Models/Comments');
const Transaction = require('../Transactions/LoadController');
const FeedbackEmail = require('../../Models/FeedbackEmail');
const Email = require('../../utils/email');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const { upload, uploadToStorage } = require('../../Middleware/Upload');
const User = require('../../Models/User');





exports.getFeedbackEmail = (req, res, next) =>
  feedbackEmailService.getFeedbackEmailDefault(req, res, next);

// show all feedback emails 
// GET feedback emails
exports.index = catchAsync(async (req, res, next) => {
  var result = await feedbackEmailService.getAllFeedbackEmails(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});

// save a new reservation 
// POST feedback emails 
exports.store = catchAsync(async (req, res, next) => {
  const user = await userService.getUser({
    email: req.body.user.email,
  });

  var category = null;

  if (req.body.category) {
    category = await ServiceCategoryService.getServiceCategory({
      code: req.body.category
    });
  }


  const assignedTo = await AdminService.getNextAdmin();
  await AdminService.updateAssignment(assignedTo._id);

  req.body.user = user._id;
  req.body.email = !req.body.email ? user.email : req.body.email
  req.body.category = category ? category._id : null;
  req.body.assignedTo = assignedTo._id;

  const mewFeedbackEmail = await feedbackEmailService.createFeedbackEmail(req.body);

  return res.status(200).json({
    status: 'success',
    data: {
      mewFeedbackEmail
    },
  });
});

// get a single reservation 
// GET feedback emails/:id
exports.show = catchAsync(async (req, res, next) => {
  const result = await feedbackEmailService.getFeedbackEmail(req.params);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});

// delete reservation with id
// DELETE feedback emails/:id
exports.destroy = catchAsync(async (req, res, next) => {

});



