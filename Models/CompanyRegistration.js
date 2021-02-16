const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');




const DirectorSchema = new Schema({
    city: {
        type: String,
        // required: [true, 'Please provide company name!'],
    },
    country: {
        type: String,
        required: [true, 'Please provide director country'],
    },
    dob: {
        type: String,
        required: [true, 'Please provide director date of birth'],
    },
    document: {
        type: String,
        required: [true, 'Please provide director document'],
    },
    documentId: {
        type: String,
        required: [true, 'Please provide director document id'],
    },
    documentType: {
        type: String,
        required: [true, 'Please provide director document type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide director email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    fullName: {
        type: String,
        required: [true, 'Please provide director full name!'],
    },
    index: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, 'Please provide director phone Number'],
    },
    residence: {
        type: String,
        required: [true, 'Please provide director Residence'],
    },
    sex: {
        type: String,
    },
    signature: {
        type: String,
        required: [true, 'Please provide director signature'],
    },
    state: {
        type: String,
        required: [true, 'Please provide director state'],
    }
});

const ShareholderSchema = new Schema({
    city: {
        type: String,
        required: [true, 'Please provide shareholder city'],
    },
    country: {
        type: String,
        required: [true, 'Please provide shareholder country'],
    },
    dob: {
        type: String,
        required: [true, 'Please provide shareholder date of birth'],
    },
    document: {
        type: String,
        required: [true, 'Please provide shareholder document'],
    },
    documentId: {
        type: String,
        required: [true, 'Please provide shareholder document id'],
    },
    documentType: {
        type: String,
        required: [true, 'Please provide shareholder document type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide shareholder email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    fullName: {
        type: String,
        required: [true, 'Please provide shareholder full name'],
    },
    index: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, 'Please provide shareholder full name'],
    },
    amountOfShares: {
        type: String
    },
    amountOfShares2: {
        type: String
    },
    sharesInUnits: {
        type: String,
        required: [true, 'Please provide shares in units'],
    },
    sharesPercentage: {
        type: String,
        required: [true, 'Please provide shares in percentage'],
    },
    residence: {
        type: String,
        required: [true, 'Please provide shareholder residence'],
    },
    sex: {
        type: String,
        required: [true, 'Please provide shareholder gender'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide shareholder signature'],
    },
    state: {
        type: String,
        required: [true, 'Please provide shareholder state'],
    }
});

const GuarantorSchema = new Schema({
    amountGuaranteed: {
        type: String,
        required: [true, 'Please provide amount guaranteed'],
    },
    amountGuaranteedWords: {
        type: String,
        required: [true, 'Please provide amount guaranteed in words'],
    },
    city: {
        type: String,
        required: [true, 'Please provide shareholder city'],
    },
    country: {
        type: String,
        required: [true, 'Please provide shareholder country'],
    },
    dob: {
        type: String,
        required: [true, 'Please provide shareholder date of birth'],
    },
    document: {
        type: String,
        required: [true, 'Please provide shareholder document'],
    },
    documentId: {
        type: String,
        required: [true, 'Please provide shareholder document id'],
    },
    documentType: {
        type: String,
        required: [true, 'Please provide shareholder document type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide shareholder email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    fullName: {
        type: String,
        required: [true, 'Please provide shareholder full name'],
    },
    index: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, 'Please provide shareholder full name'],
    },
    residence: {
        type: String,
        required: [true, 'Please provide shareholder residence'],
    },
    sex: {
        type: String,
        required: [true, 'Please provide shareholder gender'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide shareholder signature'],
    },
    state: {
        type: String,
        required: [true, 'Please provide shareholder state'],
    }
});

const SecretarySchema = new Schema({
    address: {
        type: String,
        required: [true, 'Please provide secretary address'],
    },
    dob: {
        type: String,
    },
    document: {
        type: String,
        required: [true, 'Please provide secreatary document'],
    },
    documentId: {
        type: String,
        required: [true, 'Please provide secreatary document id'],
    },
    documentType: {
        type: String,
        required: [true, 'Please provide secreatary document type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide secretary email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    fullName: {
        type: String,
        required: [true, 'Please provide secretary full name']
    },
    numberType: {
        type: String
    },
    phone: {
        type: String,
        required: [true, 'Please provide secretary phone number']
    },
    regNumber: {
        type: String
    },
    secretaryType: {
        type: String
    },
    signature: {
        type: String,
        required: [true, 'Please provide secreatary signature'],
    }
});

const ObjectsOfMemorandumSchema = new Schema({
    businessCategory: {
        type: String,
    },
    businessObject: {
        type: Array,
    },
})

const CompanyRegistrationSchema = new Schema({
    companyName1: {
        type: String,
        // required: [true, 'Please provide company name!'],
    },
    companyName2: {
        type: String,
        // required: [true, 'Please provide second company name!'],
    },
    type: {
        type: String,
        required: [true, 'Please provide registration type!'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone Number'],
    },
    availabilityCode: {
        type: String,
        // required: [true, 'Please provide availability code'],
    },
    businessObject: Object,
    charge: {
        type: String,
        required: [true, 'Please provide service charge'],
    },
    objectsOfMemorandum: ObjectsOfMemorandumSchema,
    email: {
        type: String,
        required: [true, 'Please provide user email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    directors: {
        type: Object,
        required: [true, 'Please provide directors'],
    },
    minorShareholders: {
        type: Object,
    },
    corporateShareholders: {
        type: Object,
    },
    individualShareholders: {
        type: Object,
    },
    PSCs: {
        type: Object,
    },
    secretary: {
        type: Object,
        required: [true, 'Please provide secretary'],
    },
    companyType: {
        type: String,
        // required: [true, 'Please provide company type'],
    },
    adoptCACArticle:{
        type: Boolean,
        required: [true, 'Please specify article option'],
    },
    user: {
        // type: String,
        // required: [true, 'Please provide user id'],
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Please provide user id'],
    },
    status: {
        type: Schema.ObjectId,
        ref: 'SubmissionStatuses',
        required: true
    },
    category: {
        type: Schema.ObjectId,
        ref: 'ServiceCategories',
        required: true
    },
    assignedTo: {
        type: Schema.ObjectId,
        ref: 'Admin',
        required: [true, 'Please provide admin id'],
    },
    adminStatus: {
        type: Schema.ObjectId,
        ref: 'AdminStatuses',
        required: true,
    },
    designation: {
        type: String,
        required: [true, 'Please provide a designation'],
    },
    submitted: Date,
    expires: Date,
    viewed: Boolean,
    responseFiles: [String],
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
}, { collection: 'company_registrations', strict: false });

CompanyRegistrationSchema.index({
    'companyName1': 'text',
    'companyName2': 'text',
    'email': 'text',
    'compannyEmail': 'text'
});

CompanyRegistrationSchema.plugin(mongoosePaginate);


const CompanyRegistration = mongoose.model('CompanyRegistration', CompanyRegistrationSchema);

module.exports = CompanyRegistration;
