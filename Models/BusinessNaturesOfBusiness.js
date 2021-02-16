const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
});

const BusinessNaturesOfBusinessSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    subcategories:[SubCategorySchema]
}, { collection: 'business_natures_of_business' });
BusinessNaturesOfBusinessSchema.index({ 'name': 'text'});


const BusinessNaturesOfBusiness = mongoose.model('BusinessNaturesOfBusiness', BusinessNaturesOfBusinessSchema);

module.exports = BusinessNaturesOfBusiness;
