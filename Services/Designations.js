const jwt = require('jsonwebtoken');
const Designation = require('../Models/Designations');
const factory = require('../Helpers/handlerFactory');



exports.getDesignationDefault = factory.getOne(Designation);

exports.getDesignation = async (params) => {
    const query = Designation.findOne(params);
    return await query;
};


