const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const CompanyRegistrationService = require('../../Services/CompanyRegistrations');
const BusinessObjectsService = require('../../Services/BusinessObjects');
const IndividualRegistrationService = require('../../Services/IndividualRegistrations');
const userService = require('../../Services/User');
const ServiceCategoryService = require('../../Services/ServiceCategories');
const SubmissionStatusService = require('../../Services/SubmissionStatuses');
const AdminStatusService = require('../../Services/AdminStatuses');
const DesignationService = require('../../Services/Designations');
const AdminService = require('../../Services/Admin');
const CompanyRegistrationLog = require('../../Models/CompanyRegistrationLog');
const Comments = require('../../Models/Comments');
const Transaction = require('../Transactions/LoadController');
const CompanyRegistration = require('../../Models/CompanyRegistration');
const IndividualRegistration = require('../../Models/IndividualRegistration');
const Email = require('../../utils/email');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const { upload, uploadToStorage, uploadImage } = require('../../Middleware/Upload');
const User = require('../../Models/User');
const PdfHandler = require('../../utils/pdfHandler');
var pdf = require("pdf-creator-node");
var fs = require('fs');
const PDFDocument = require('pdfkit');




const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);




exports.getCompanyRegistration = (req, res, next) =>
  CompanyRegistrationService.getCompanyRegistrationDefault(req, res, next);

// show all registrations 
// GET registrations
exports.index = catchAsync(async (req, res, next) => {
  var result = await CompanyRegistrationService.getAllCompanyRegistrations(req);

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
    code: 'company_reg'
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
  req.body.responseFiles = [];

  var date = new Date();
  req.body.submitted = Date.now();
  req.body.expires = date.setDate(date.getDate() + 60);
  req.body.viewed = false
  const TransactionData = req.body.transactionData;

  req.body.transactionData = null;
  const newCompanyRegistration = await CompanyRegistrationService.createCompanyregistration(req.body);
  TransactionData.user = user._id;
  TransactionData.service = newCompanyRegistration._id;

  const pdfhandler = new PdfHandler(req.body);
  const attachmentPaths = []

  if (req.body.type === 'limitedByGuarantee') {

  } else {
    const moa_pdf_name = await pdfhandler.generateMOA();
    attachmentPaths.push(moa_pdf_name)
  }


  const email = new Email(user, null, [], attachmentPaths)

  email.send('documentsGenerated', 'Company Registration Received')

  // for (var path of attachmentPaths) {
  //   fs.unlinkSync(`files/${path}`)
  // }

  req.body = TransactionData;

  Transaction.store(req);


  let title = 'New Company Registration Created';
  let comment = await Comments.find({ title: title });

  await CompanyRegistrationLog.create({
    companyRegistration: newCompanyRegistration._id,
    comment: comment[0]._id,
    user: user._id,
    admin: assignedTo._id
  });

  return res.status(200).json({
    status: 'success',
    data: {
      newCompanyRegistration
    },
  });
});


// get a single registration 
// GET registration/:id
exports.show = catchAsync(async (req, res, next) => {
  const result = await CompanyRegistrationService.getCompanyRegistration(req.params);

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

  const updatedCompanyRegistration = await CompanyRegistration.update({ _id: req.body._id },
    { $set: { "adminStatus": adminStatus._id } }, { multi: true })

  const companyRegistration = await CompanyRegistration.find({ _id: req.body._id });

  let title = 'Company Registration Deployed';
  let comment = await Comments.find({ title: title });

  await CompanyRegistrationLog.create({
    companyRegistration: companyRegistration[0]._id,
    comment: comment[0]._id,
    user: companyRegistration[0].user,
    admin: companyRegistration[0].assignedTo
  });

  return res.status(200).json({
    status: 'success',
    data: {
      updatedCompanyRegistration
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

    const updatedCompanyRegistration = await CompanyRegistration.update({ _id: req.params.id },
      {
        $set: {
          "adminStatus": adminStatus._id,
          "status": status._id,
          "responseFiles": urls
        },
      },
      { multi: true }
    )


    const companyRegistration = await CompanyRegistration.find({ _id: req.params.id })
    const user = await User.findById(companyRegistration[0].user);

    const email = new Email(user, null, urls)

    email.send('companyRegistrationApproved', 'Company Registration Approved')

    let title = 'Company Registration Completed';
    let comment = await Comments.find({ title: title });

    await CompanyRegistrationLog.create({
      companyRegistration: companyRegistration[0]._id,
      comment: comment[0]._id,
      user: companyRegistration[0].user,
      admin: companyRegistration[0].assignedTo
    });

    return res.status(200).json({
      status: 'success',
      data: {
        companyRegistration
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

    const updatedCompanyRegistration = await CompanyRegistration.update({ _id: req.params.id },
      {
        $set: {
          "adminStatus": adminStatus._id,
          "status": status._id,
          "responseFiles": urls
        },
      },
      { multi: true }
    )


    const companyRegistration = await CompanyRegistration.find({ _id: req.params.id })
    const user = await User.findById(companyRegistration[0].user);

    const email = new Email(user, null, urls)

    email.send('companyRegistrationDeclined', 'Company Registration Declined')

    let title = 'Company Registration Rejected';
    let comment = await Comments.find({ title: title });

    await CompanyRegistrationLog.create({
      companyRegistration: companyRegistration[0]._id,
      comment: comment[0]._id,
      user: companyRegistration[0].user,
      admin: companyRegistration[0].assignedTo
    });

    return res.status(200).json({
      status: 'success',
      data: {
        companyRegistration
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

exports.getBusinessObjects = catchAsync(async (req, res, next) => {
  const result = await BusinessObjectsService.getAllBusinessObjects(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});




