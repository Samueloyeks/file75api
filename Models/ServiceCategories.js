const mongoose = require('mongoose');

const ServiceCategoriesSchema = new mongoose.Schema({
    id: {
        type: String
    },
    code: {
        type: String
    },
    category: { 
        type: String
    },
    description:{
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'service_categories' });


const ServiceCategories = mongoose.model('ServiceCategories', ServiceCategoriesSchema);

module.exports = ServiceCategories;
