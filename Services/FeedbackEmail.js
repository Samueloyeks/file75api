const FeedbackEmail = require('../Models/FeedbackEmail');
const SubmissionStatuses = require('../Models/SubmissionStatuses');
const AdminStatuses = require('../Models/AdminStatuses');
const ServiceCategories = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');
const AdminService = require('./Admin');





exports.createFeedbackEmail = async (req) => {
    return await FeedbackEmail.create({
        email: req.email,
        phone: req.phone,
        body: req.body,
        submission: req.submission,
        fullName:req.fullName,
        user: req.user,
        category: req.category,
        assignedTo: req.assignedTo
    });
};

exports.getFeedbackEmailDefault= factory.getOne(FeedbackEmail);


exports.getFeedbackEmail = async (params) => {
    const reqparams = { _id: params.id };
    const query = FeedbackEmail.findOne(reqparams);
    return await query;
};

exports.getAllFeedbackEmails = async (req) => {
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

    var query = FeedbackEmail.find();
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
    const query = FeedbackEmail.find({
        "user": userId
    });
    return await query;
}


