const jwt = require('jsonwebtoken');
const BusinessRegistration = require('../Models/BusinessRegistration');
const SubmissionStatuses = require('../Models/SubmissionStatuses');
const AdminStatuses = require('../Models/AdminStatuses');
const ServiceCategories = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');
const AdminService = require('./Admin');





exports.createBusinessregistration = async (req) => {
    return await BusinessRegistration.create({
        corporateName:req.corporateName,
        companyNo:req.companyNo,
        businessName1: req.businessName1,
        businessName2: req.businessName2,
        phone: req.phone,
        availabilityCode:req.availabilityCode,
        fullName:req.fullName,
        companyDesignation:req.companyDesignation,
        signature:req.signature,
        charge: req.charge,
        email: req.email,
        user: req.user,
        status: req.status,
        category: req.category,
        assignedTo: req.assignedTo,
        adminStatus: req.adminStatus,
        submitted: req.submitted,
        expires: req.expires,
        viewed: req.viewed,
        designation: req.designation,
        responseFiles:req.responseFiles
    });
};

exports.getBusinessRegistrationDefault = factory.getOne(BusinessRegistration);


exports.getBusinessRegistration = async (params) => {
    const reqparams = { _id: params.id };
    const query = BusinessRegistration.findOne(reqparams);
    return await query;
};

exports.getAllBusinessRegistrations= async (req) => {
    const {
        associations = [],
        page = 1,
        perPage = 30,
        search = null,
        byUserId = null,
        byAdminId = null,
        byStatusCode = null,
        byAdminStatusCode=null,
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
        "userId": userId
    });
    return await query;
}


