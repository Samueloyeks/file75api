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
    },
});

const ShareholderSchema = new Schema({
    amountOfShares: {
        type: String,
        required: [true, 'Please provide amount of shares'],
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
    pricePerShare: {
        type: String,
        required: [true, 'Please provide price per share'],
    },
    residence: {
        type: String,
        required: [true, 'Please provide shareholder residence'],
    },
    sex: {
        type: String,
        required: [true, 'Please provide shareholder gender'],
    },
    shareCapital: {
        type: String,
        required: [true, 'Please provide share capital'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide shareholder signature'],
    },
    state: {
        type: String,
        required: [true, 'Please provide shareholder state'],
    },
    valueOfShares: {
        type: String,
        required: [true, 'Please provide value of shares'],
    },
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

const CompanyRegistrationSchema = new Schema({
    companyName1: {
        type: String,
        required: [true, 'Please provide company name!'],
    },
    companyName2: {
        type: String,
        required: [true, 'Please provide second company name!'],
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
    charge: {
        type: String,
        required: [true, 'Please provide service charge'],
    },
    officeAddress: {
        type: String,
        required: [true, 'Please provide office address'],
    },
    headOfficeAddress: {
        type: String,
        required: [true, 'Please provide head office address'],
    },
    businessCategory: {
        type: String,
        required: [true, 'Please provide business type'],
    },
    address: {
        type: String,
        required: [true, 'Please provide address'],
    },
    email: {
        type: String,
        required: [true, 'Please provide user email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    companyEmail: {
        type: String,
        required: [true, 'Please provide company email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    directors: [DirectorSchema],
    shareholders: [ShareholderSchema],
    secretary: {
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
}, { collection: 'company_registrations' });

CompanyRegistrationSchema.index({
    'companyName1': 'text',
    'companyName2': 'text',
    'email': 'text',
    'compannyEmail': 'text'
});

CompanyRegistrationSchema.plugin(mongoosePaginate);


const CompanyRegistration = mongoose.model('CompanyRegistration', CompanyRegistrationSchema);

module.exports = CompanyRegistration;
