const ArticlesOfAssociation = require('../Models/ArticlesOfAssociation');

exports.getArticlesOfAssociation = async (req) => {
    const {
        search = null
    } = req.query;

    var query = ArticlesOfAssociation.find();
    // if (search) query = query.find({ $text: { $search: search } });

    return await query;
};


