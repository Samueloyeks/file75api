const CompanyNatureOfBusiness = require('../Models/CompanyNaturesOfBusiness');

exports.getAllCompanyNaturesOfBusiness = async (req) => {
    const {
        search = null
    } = req.query;

    var query = CompanyNatureOfBusiness.find();
    if (search) query = query.find({ $text: { $search: search } });

    return await query;
};


