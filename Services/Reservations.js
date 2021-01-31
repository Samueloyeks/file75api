const jwt = require('jsonwebtoken');
const Reservation = require('../Models/Reservation');
const SubmissionStatuses = require('../Models/SubmissionStatuses');
const AdminStatuses = require('../Models/AdminStatuses');
const ServiceCategories = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');
const AdminService = require('./Admin');





exports.createReservation = async (req) => {
    return await Reservation.create({
        companyName1: req.companyName1,
        companyName2: req.companyName2,
        phone: req.phone,
        charge: req.charge,
        email: req.email,
        additionalComment: req.additionalComment,
        natureOfBusiness: req.natureOfBusiness,
        specificBusinessType: req.specificBusinessType,
        specificNature: req.specificNature,
        type: req.type,
        companyReservationType:req.companyReservationType,
        companyType:req.companyType,
        user: req.user,
        status: req.status,
        category: req.category,
        assignedTo: req.assignedTo,
        adminStatus: req.adminStatus,
        submitted: req.submitted,
        expires: req.expires,
        viewed: req.viewed,
        designation: req.designation,
        responseFiles: req.responseFiles
    });
};

exports.getReservationDefault = factory.getOne(Reservation);


exports.getReservation = async (params) => {
    const reqparams = { _id: params.id };
    const query = Reservation.findOne(reqparams);
    return await query;
};

exports.getAllReservations = async (req) => {
    const {
        associations = [],
        page = 1,
        perPage = 15,
        search = null,
        byUserId = null,
        byAdminId = null,
        byStatusCode = null,
        byAdminStatusCode = null,
        byCategorycode = null
    } = req.query;

    var query = Reservation.find();
    const skip = parseInt((page - 1) * perPage);
    const pageLimit = parseInt(perPage)

    if (byUserId) query = query.find({ "user": byUserId });

    if (byAdminId) {
        const admin = await AdminService.getOne(byAdminId);
        const designations = admin.designations;

        query = query.find({
            "assignedTo": byAdminId,
            "designation": { $in: designations }
        });
    }

    if (associations.length > 0) {
        for (const association of associations.split(',')) {
            query = query.populate(association)
        }
    }

    if (byStatusCode) {
        const status = await SubmissionStatuses.find({ "code": byStatusCode });
        const statusId = status[0]._id
        query = query.find({ "status": statusId });
    }

    if (byAdminStatusCode) {
        const adminStatus = await AdminStatuses.find({ "code": byAdminStatusCode });
        const adminStatusId = adminStatus[0]._id
        query = query.find({ "adminStatus": adminStatusId });
    }

    if (byCategorycode) {
        const category = await ServiceCategories.find({ "code": byCategorycode });
        const categoryId = category[0]._id;
        query = query.find({ "category": categoryId });
    }

    if (search) query = query.find({ $text: { $search: search } });

    return await query.skip(skip).sort([['_id', -1]]).limit(pageLimit);
};

exports.byUser = async (userId) => {
    const query = Reservation.find({
        "user": userId
    });
    return await query;
}


