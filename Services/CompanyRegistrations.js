const jwt = require('jsonwebtoken');
const CompanyRegistration = require('../Models/CompanyRegistration');
const IndividualRegistration = require('../Models/IndividualRegistration');
const SubmissionStatuses = require('../Models/SubmissionStatuses');
const AdminStatuses = require('../Models/AdminStatuses');
const ServiceCategories = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');
const AdminService = require('./Admin');





exports.createCompanyregistration = async (req) => {
    return await CompanyRegistration.create({
        companyName1: req.companyName1,
        companyName2: req.companyName2,
        phone: req.phone,
        availabilityCode: req.availabilityCode,
        businessObject:req.businessObject,
        companyEmail: req.companyEmail,
        officeAddress: req.officeAddress,
        headOfficeAddress: req.headOfficeAddress,
        charge: req.charge,
        email: req.email,
        user: req.user,
        directors: req.directors,
        shareCapitalUnits: req.shareCapitalUnits,
        pricePerShare: req.pricePerShare,
        valueOfShares: req.valueOfShares,
        shareholders: req.shareholders,
        guarantors: req.guarantors,
        secretary: req.secretary,
        totalGuarantee: req.totalGuarantee,
        companyType: req.companyType,
        witnessName: req.witnessName,
        witnessAddress: req.witnessAddress,
        witnessOccupation: req.witnessOccupation,
        witnessSignature: req.witnessSignature,
        status: req.status,
        category: req.category,
        assignedTo: req.assignedTo,
        adminStatus: req.adminStatus,
        submitted: req.submitted,
        expires: req.expires,
        viewed: req.viewed,
        designation: req.designation,
        responseFiles: req.responseFiles,
        type: req.type,
        businessCategory: req.businessCategory,
        address: req.address
    });
};

exports.getCompanyRegistrationDefault = factory.getOne(CompanyRegistration);


exports.getCompanyRegistration = async (params) => {
    const reqparams = { _id: params.id };
    const query = CompanyRegistration.findOne(reqparams);
    return await query;
};

exports.getAllCompanyRegistrations = async (req) => {
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

    var query = CompanyRegistration.find();

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
    const query = CompanyRegistration.find({
        "user": userId
    });
    return await query;
}


