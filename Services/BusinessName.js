const jwt = require('jsonwebtoken');
const BusinessName = require('../Models/BusinessName');
const factory = require('../Helpers/handlerFactory');


exports.createBusinessName = async (req) => {
    return await BusinessName.create({
        companyName1: req.companyName1,
        companyName2: req.companyName2,
        phone: req.phone,
        charge:req.charge,
        email:req.email,
        userId:req.userId
    });
};

exports.getBusinessNameDefault = factory.getOne(BusinessName);

exports.getBusinessName = async (params) => {
    const query = User.findOne(params);
    return await query;
};


