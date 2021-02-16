const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    }
});

const CompanyNaturesOfBusinessSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    subcategories:[SubCategorySchema]
}, { collection: 'company_natures_of_business' });
CompanyNaturesOfBusinessSchema.index({ 'name': 'text'});


const CompanyNaturesOfBusiness = mongoose.model('CompanyNaturesOfBusiness', CompanyNaturesOfBusinessSchema);

module.exports = CompanyNaturesOfBusiness;
