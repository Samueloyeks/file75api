const mongoose = require('mongoose');

const DesignationsSchema = new mongoose.Schema({
    id: {
        type: String
    },
    code: {
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
},{ collection: 'designations' });


const Designations = mongoose.model('Designations', DesignationsSchema);

module.exports = Designations;
