const jwt = require('jsonwebtoken');
const IndividualRegistration = require('../Models/IndividualRegistration');
const SubmissionStatuses = require('../Models/SubmissionStatuses');
const AdminStatuses = require('../Models/AdminStatuses');
const ServiceCategories = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');
const AdminService = require('./Admin');





exports.createIndividualregistration = async (req) => {
    return await IndividualRegistration.create({
        businessName1: req.businessName1,
        businessName2: req.businessName2,
        availabilityCode: req.availabilityCode,
        principalAddress: req.principalAddress,
        branchAddress: req.branchAddress,
        businessCategory: req.businessCategory,
        fullName: req.fullName,
        surname: req.surname,
        age: req.age,
        sex: req.sex,
        phone: req.phone,
        email: req.email,
        address: req.email,
        occupation: req.occupation,
        nationality: req.nationality,
        state: req.state,
        city: req.city,
        signature: req.signature,
        passport: req.passport,
        charge: req.charge,
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

exports.getIndividualRegistrationDefault = factory.getOne(IndividualRegistration);


exports.getIndividualRegistration = async (params) => {
    const reqparams = { _id: params.id };
    const query = IndividualRegistration.findOne(reqparams);
    return await query;
};

exports.getAllIndividualRegistration = async (req) => {
    const {
        associations = [],
        page = 1,
        perPage = 30,
        search = null,
        byUserId = null,
        byAdminId = null,
        byStatusCode = null,
        byAdminStatusCode = null,
        byCategorycode = null
    } = req.query;

    var query = IndividualRegistration.find();
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
    const query = IndividualRegistration.find({
        "user": userId
    });
    return await query;
}


