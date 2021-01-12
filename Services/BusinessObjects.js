const BusinessObject = require('../Models/BusinessObjects');

exports.getAllBusinessObjects = async (req) => {
    const {
        search = null
    } = req.query;

    var query = BusinessObject.find();
    if (search) query = query.find({ $text: { $search: search } });

    return await query;
};


