const jwt = require('jsonwebtoken');
const AdminStatus = require('../Models/AdminStatuses');
const factory = require('../Helpers/handlerFactory');



exports.getAdminStatusDefault = factory.getOne(AdminStatus);

exports.getAdminStatus = async (params) => {
    const query = AdminStatus.findOne(params);
    return await query;
};



