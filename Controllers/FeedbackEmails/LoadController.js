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
const ReservationService = require('../../Services/Reservations');
const BusinessRegistrationService = require('../../Services/BusinessRegistrations');
const CompanyRegistrationService = require('../../Services/CompanyRegistrations');





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
  var category = null;
  var submission = null;
  var assignedTo = null
  var user = null
  const { categoryCode, submissionId } = req.body;

  if (req.body.user) {
    user = await userService.getUser({
      email: req.body.user.email,
    });
  }



  if (categoryCode) {
    category = await ServiceCategoryService.getServiceCategory({
      code: categoryCode
    });

    if (submissionId) {
      if (categoryCode === 'name_rsv') {
        submission = await ReservationService.getReservation({
          id: submissionId
        });
      } else if (categoryCode === 'business_reg') {
        submission = await BusinessRegistrationService.getBusinessRegistration({
          id: submissionId
        });
      } else if (categoryCode === 'company_reg') {
        submission = await CompanyRegistrationService.getCompanyRegistration({
          id: submissionId
        });
      }
    }
  }


  assignedTo = submission ? await AdminService.getOne(submission.assignedTo, false, null) : await AdminService.getNextAdmin();

  await AdminService.updateAssignment(assignedTo._id);

  req.body.user = user ? user._id : null;
  req.body.email = !req.body.email ? (user ? user.email : null) : req.body.email
  req.body.fullName = !req.body.fullName ? (user ? user.fullName : null) : req.body.fullName
  req.body.category = category ? category._id : null;
  req.body.assignedTo = assignedTo._id;
  req.body.submission = submission ? submission._id : null;


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



