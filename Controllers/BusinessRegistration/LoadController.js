const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const BusinessRegistrationService = require('../../Services/BusinessRegistrations');
const IndividualRegistrationService = require('../../Services/IndividualRegistrations');
const userService = require('../../Services/User');
const ServiceCategoryService = require('../../Services/ServiceCategories');
const SubmissionStatusService = require('../../Services/SubmissionStatuses');
const AdminStatusService = require('../../Services/AdminStatuses');
const DesignationService = require('../../Services/Designations');
const AdminService = require('../../Services/Admin');
const BusinessRegistrationLog = require('../../Models/BusinessRegistrationLog');
const Comments = require('../../Models/Comments');
const Transaction = require('../Transactions/LoadController');
const BusinessRegistration = require('../../Models/BusinessRegistration');
const IndividualRegistration = require('../../Models/IndividualRegistration');
const Email = require('../../utils/email');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const { upload, uploadToStorage, uploadImage } = require('../../Middleware/Upload');
const User = require('../../Models/User');



const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);




exports.getBusinessRegistration = (req, res, next) =>
  BusinessRegistrationService.getBusinessRegistrationDefault(req, res, next);

// show all registrations 
// GET registrations
exports.index = catchAsync(async (req, res, next) => {
  var result = await BusinessRegistrationService.getAllBusinessRegistrations(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});


// save a new registration 
// POST registration 
exports.store = catchAsync(async (req, res, next) => {

  const user = await userService.getUser({
    email: req.body.email,
  });

  const category = await ServiceCategoryService.getServiceCategory({
    code: 'business_reg'
  });

  const status = await SubmissionStatusService.getStatus({
    code: 'pending'
  });

  const adminStatus = await AdminStatusService.getAdminStatus({
    code: 'unattended'
  });

  // req.body.signature = await uploadImage(req.body.signatureImage);

  const assignedTo = await AdminService.getNextAdmin();
  await AdminService.updateAssignment(assignedTo._id);

  req.body.user = user._id;
  req.body.status = status._id;
  req.body.category = category._id;
  req.body.adminStatus = adminStatus._id;
  req.body.assignedTo = assignedTo._id;
  req.body.designation = 'cac';
  req.body.responseFiles = []


  var date = new Date();
  req.body.submitted = Date.now();
  req.body.expires = date.setDate(date.getDate() + 60);
  req.body.viewed = false
  const TransactionData = req.body.transactionData;

  req.body.transactionData = null;
  const newBusinessRegistration = await BusinessRegistrationService.createBusinessregistration(req.body);
  TransactionData.user = user._id;
  TransactionData.service = newBusinessRegistration._id;

  req.body = TransactionData;

  Transaction.store(req);

  let title = 'New Business Registration Created';
  let comment = await Comments.find({ title: title });

  await BusinessRegistrationLog.create({
    businessRegistration: newBusinessRegistration._id,
    comment: comment[0]._id,
    user: user._id,
    admin: assignedTo._id
  });

  return res.status(200).json({
    status: 'success',
    data: {
      newBusinessRegistration
    },
  });
});


// get a single registration 
// GET registration/:id
exports.show = catchAsync(async (req, res, next) => {
  const result = await BusinessRegistrationService.getBusinessRegistration(req.params);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});

// update registration details
// PUT or PATCH registration/:id
exports.deploy = catchAsync(async (req, res, next) => {

  const adminStatus = await AdminStatusService.getAdminStatus({
    code: 'deployed'
  });

  const updatedBusinessRegistration = await BusinessRegistration.update({ _id: req.body._id },
    { $set: { "adminStatus": adminStatus._id } }, { multi: true })

  const businessRegistration = await BusinessRegistration.find({ _id: req.body._id });

  let title = 'Business Registration Deployed';
  let comment = await Comments.find({ title: title });

  await BusinessRegistrationLog.create({
    businessRegistration: businessRegistration[0]._id,
    comment: comment[0]._id,
    user: businessRegistration[0].user,
    admin: businessRegistration[0].assignedTo
  });

  return res.status(200).json({
    status: 'success',
    data: {
      updatedBusinessRegistration
    },
  });
});

exports.finish = catchAsync(async (req, res, next) => {

  try {

    if (!req.files) {
      console.log('no files')
      res.status(400).send('Error, could not upload file');
      return;
    }

    let urls = []


    if (Array.isArray(req.files.responseFiles)) {
      for (var file of req.files.responseFiles) {
        const url = await uploadToStorage(file)
        urls.push(url)
      }
    } else {
      const url = await uploadToStorage(req.files.responseFiles)
      urls.push(url)
    }

    const adminStatus = await AdminStatusService.getAdminStatus({
      code: 'finished'
    });

    const status = await SubmissionStatusService.getStatus({
      code: 'approved'
    });

    const updatedBusinessRegistration = await BusinessRegistration.update({ _id: req.params.id },
      {
        $set: {
          "adminStatus": adminStatus._id,
          "status": status._id,
          "responseFiles": urls
        },
      },
      { multi: true }
    )


    const businessRegistration = await BusinessRegistration.find({ _id: req.params.id })
    const user = await User.findById(businessRegistration[0].user);

    const email = new Email(user, null, urls)

    email.send('businessRegistrationApproved', 'Business Registration Approved')

    let title = 'Business Registration Completed';
    let comment = await Comments.find({ title: title });

    await BusinessRegistrationLog.create({
      businessRegistration: businessRegistration[0]._id,
      comment: comment[0]._id,
      user: businessRegistration[0].user,
      admin: businessRegistration[0].assignedTo
    });

    return res.status(200).json({
      status: 'success',
      data: {
        businessRegistration
      },
    });

    // res
    //   .status(200)
    //   .send(urls);

  } catch (error) {
    console.log(error)
    console.log('unable to upload')
    res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }

});

exports.reject = catchAsync(async (req, res, next) => {

  try {

    if (!req.files) {
      console.log('no files')
      res.status(400).send('Error, could not upload file');
      return;
    }

    let urls = []


    if (Array.isArray(req.files.responseFiles)) {
      for (var file of req.files.responseFiles) {
        const url = await uploadToStorage(file)
        urls.push(url)
      }
    } else {
      const url = await uploadToStorage(req.files.responseFiles)
      urls.push(url)
    }

    const adminStatus = await AdminStatusService.getAdminStatus({
      code: 'rejected'
    });

    const status = await SubmissionStatusService.getStatus({
      code: 'rejected'
    });

    const updatedBusinessRegistration = await BusinessRegistration.update({ _id: req.params.id },
      {
        $set: {
          "adminStatus": adminStatus._id,
          "status": status._id,
          "responseFiles": urls
        },
      },
      { multi: true }
    )


    const businessRegistration = await BusinessRegistration.find({ _id: req.params.id })
    const user = await User.findById(businessRegistration[0].user);

    const email = new Email(user, null, urls)

    email.send('businessRegistrationDeclined', 'Business Registration Declined')

    let title = 'Business Registration Rejected';
    let comment = await Comments.find({ title: title });

    await BusinessRegistrationLog.create({
      businessRegistration: businessRegistration[0]._id,
      comment: comment[0]._id,
      user: businessRegistration[0].user,
      admin: businessRegistration[0].assignedTo
    });

    return res.status(200).json({
      status: 'success',
      data: {
        businessRegistration
      },
    });

    // res
    //   .status(200)
    //   .send(urls);

  } catch (error) {
    console.log(error)
    console.log('unable to upload')
    res.status(400).send(`Error, could not upload file: ${error}`);
    return;
  }

});

// delete registration with id
// DELETE registrations/:id
exports.destroy = catchAsync(async (req, res, next) => {

});

exports.saveImage = catchAsync(async (req, res, next) => {

  let url = await uploadImage(req.body);


  return res.status(200).json({
    status: 'success',
    data: {
      url
    },
  });
})




