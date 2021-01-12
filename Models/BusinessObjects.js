const mongoose = require('mongoose');

const BusinessObjectsSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    name: {
        type: String
    },
    businessObject: {
        type: Array
    }
}, { collection: 'business_objects' });
BusinessObjectsSchema.index({ 'name': 'text'});


const BusinessObjects = mongoose.model('BusinessObjects', BusinessObjectsSchema);

module.exports = BusinessObjects;
