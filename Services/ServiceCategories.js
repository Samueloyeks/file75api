const jwt = require('jsonwebtoken');
const ServiceCategory = require('../Models/ServiceCategories');
const factory = require('../Helpers/handlerFactory');



exports.getServiceCategoryDefault = factory.getOne(ServiceCategory);

exports.getCategory = async (params) => {
    const query = ServiceCategory.findOne(params);
    return await query;
};


