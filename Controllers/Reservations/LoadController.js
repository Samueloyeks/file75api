const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const reservationService = require('../../Services/Reservations');
const userService = require('../../Services/User');
const ServiceCategoryService = require('../../Services/ServiceCategories');
const SubmissionStatusService = require('../../Services/SubmissionStatuses');
const AdminStatusService = require('../../Services/AdminStatuses');
const DesignationService = require('../../Services/Designations');
const AdminService = require('../../Services/Admin');
const Transaction = require('../Transactions/LoadController');
const Reservation = require('../../Models/Reservation');
const Email = require('../../utils/email');
const bodyParser = require('body-parser');
const { Storage } = require('@google-cloud/storage');
const { upload, uploadToStorage } = require('../../Middleware/Upload');
const User = require('../../Models/User');



const storage = new Storage({
  projectId: process.env.GCLOUD_PROJECT_ID,
  keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
});

const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);




exports.getReservation = (req, res, next) =>
  reservationService.getReservationDefault(req, res, next);

// show all reservations 
// GET reservations
exports.index = catchAsync(async (req, res, next) => {
  var result = await reservationService.getAllReservations(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});

// save a new reservation 
// POST reservations 
exports.store = catchAsync(async (req, res, next) => {
  const user = await userService.getUser({
    email: req.body.email,
  });

  const category = await ServiceCategoryService.getServiceCategory({
    code: 'name_rsv'
  });

  const status = await SubmissionStatusService.getStatus({
    code: 'pending'
  });

  const adminStatus = await AdminStatusService.getAdminStatus({
    code: 'unattended'
  });


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
  const newreservation = await reservationService.createReservation(req.body);

  TransactionData.user = user._id;
  TransactionData.service = newreservation._id;

  req.body = TransactionData;

  Transaction.store(req);

  return res.status(200).json({
    status: 'success',
    data: {
      newreservation
    },
  });
});

// get a single reservation 
// GET reservations/:id
exports.show = catchAsync(async (req, res, next) => {
  const result = await reservationService.getReservation(req.params);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});

// update reservation details
// PUT or PATCH reservations/:id
exports.deploy = catchAsync(async (req, res, next) => {

  const adminStatus = await AdminStatusService.getAdminStatus({
    code: 'deployed'
  });

  const updatedReservation = await Reservation.update({ _id: req.body._id },
    { $set: { "adminStatus": adminStatus._id } }, { multi: true })


  return res.status(200).json({
    status: 'success',
    data: {
      updatedReservation
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

    const updatedReservation = await Reservation.update({ _id: req.params.id },
      {
        $set: {
          "adminStatus": adminStatus._id,
          "status": status._id,
          "responseFiles": urls
        },
      },
      { multi: true }
    )


    const reservation = await Reservation.find({ _id: req.params.id })
    const user = await User.findById(reservation[0].user);

    const email = new Email(user, null, urls)

    email.send('reservationApproved', 'Name Reservation Approved')

    return res.status(200).json({
      status: 'success',
      data: {
        reservation
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

// delete reservation with id
// DELETE reservations/:id
exports.destroy = catchAsync(async (req, res, next) => {

});

exports.userReservations = catchAsync(async (req, res, next) => {

});


