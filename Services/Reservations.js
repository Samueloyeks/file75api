const jwt = require('jsonwebtoken');
const Reservation = require('../Models/Reservation');
const SubmissionStatuses = require('../Models/SubmissionStatuses');
const ServiceCategories = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');




exports.createReservation = async (req) => {
    return await Reservation.create({
        companyName1: req.companyName1,
        companyName2: req.companyName2,
        phone: req.phone,
        charge: req.charge,
        email: req.email,
        userId: req.userId,
        status: req.status,
        category_id: req.category_id,
        submitted: req.submitted,
        expires: req.expires,
        viewed: req.viewed
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
        perPage = 30,
        search = null,
        byUserId = null,
        byStatusCode = null,
        byCategorycode = null
    } = req.query;

    var query = Reservation.find();
    const skip = parseInt((page - 1) * perPage);
    const pageLimit = parseInt(perPage)

    if (byUserId) query = query.find({ "userId": byUserId });

    if (associations.length > 0) {
        for (const association of associations) {
            query = query.populate(association)
        }
    }

    if (byStatusCode) {
        const status = await SubmissionStatuses.find({ "code": byStatusCode });
        const statusId = status[0]._id
        query = query.find({ "status": statusId });
    }

    if (byCategorycode) {
        const category = await ServiceCategories.find({ "code": byCategorycode });
        const categoryId = category[0]._id;
        query = query.find({ "category_id": categoryId });
    }

    if (search) query = query.find({ $text: { $search: search } });

    return await query.skip(skip).limit(pageLimit);
};

exports.byUser = async (userId) => {
    const query = Reservation.find({
        "userId": userId
    });
    return await query;
}


