const Faq = require('../Models/Faq');

exports.getAllFaq = async (req) => {
    const {
        search = null
    } = req.query;

    var query = Faq.find();
    if (search) query = query.find({ $text: { $search: search } });

    return await query;
};


