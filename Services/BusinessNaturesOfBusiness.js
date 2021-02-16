const BusinessNatureOfBusiness = require('../Models/BusinessNaturesOfBusiness');

exports.getAllBusinessNaturesOfBusiness = async (req) => {
    const {
        search = null
    } = req.query;

    var query = BusinessNatureOfBusiness.find();
    if (search) query = query.find({ $text: { $search: search } });

    return await query;
};


