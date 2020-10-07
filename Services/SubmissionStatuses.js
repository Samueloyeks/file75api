const jwt = require('jsonwebtoken');
const SubmissionStatus = require('../Models/SubmissionStatuses');
const factory = require('../Helpers/handlerFactory');



exports.getSubmissionStatusDefault = factory.getOne(SubmissionStatus);

exports.getStatus = async (params) => {
    const query = SubmissionStatus.findOne(params);
    return await query;
};


