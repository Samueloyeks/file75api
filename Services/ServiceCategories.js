const jwt = require('jsonwebtoken');
const ServiceCategory = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');



exports.getServiceCategoryDefault = factory.getOne(ServiceCategory);

exports.getServiceCategory = async (params) => {
    const query = ServiceCategory.findOne(params);
    return await query;
};

exports.getAllServiceCategories = async () => {
    var query = ServiceCategory.find();
    return await query;
};

