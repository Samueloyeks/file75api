const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;
const validator = require('validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const authorizedSignatorySchema = new Schema({
    dob: {
        type: String,
        required: [true, 'Please provide signatory dob'],
    },
    email: {
        type: String,
        required: [true, 'Please provide signatory email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    firstName: {
        type: String,
        required: [true, 'Please provide signatory first name'],
    },
    surname: {
        type: String,
        required: [true, 'Please provide signatory last name'],
    },
    otherName: { type: String },
    nationality: {
        type: String,
        required: [true, 'Please provide signatory nationality'],
    },
    passport: {
        type: String,
        required: [true, 'Please provide signatory passport'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide signatory phone'],
    },
    sex: {
        type: String,
        required: [true, 'Please provide signatory sex'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide signatory signature'],
    }
})

const placeOfBusinessSchema = new Schema({
    branchAddress: {
        type: String,
    },
    city: {
        type: String,
        required: [true, 'Please provide place of business city'],
    },
    houseNumber: {
        type: String,
        required: [true, 'Please provide place of business number'],
    },
    lga: {
        type: String,
        required: [true, 'Please provide place of business LGA'],
    },
    postalCode: { type: String },
    state: {
        type: String,
        required: [true, 'Please provide place of business state'],
    },
    streetName: {
        type: String,
        required: [true, 'Please provide place of business sttreet'],
    }
})

const addressSchema = new Schema({
    country: {
        type: String,
        required: [true, 'Please provide residential address country'],
    },
    city: {
        type: String,
        required: [true, 'Please provide residential address city'],
    },
    houseNumber: {
        type: String,
        required: [true, 'Please provide residential address number'],
    },
    lga: {
        type: String,
        required: [true, 'Please provide residential address LGA'],
    },
    postalCode: { type: String },
    state: {
        type: String,
        required: [true, 'Please provide residential address state'],
    },
    streetName: {
        type: String,
        required: [true, 'Please provide residential address sttreet'],
    }
})

const addressSchema2 = new Schema({
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    houseNumber: {
        type: String,
    },
    lga: {
        type: String,
    },
    postalCode: { type: String },
    state: {
        type: String,
    },
    streetName: {
        type: String,
    }
})

const attesteeSchema = new Schema({
    residentialAddress: addressSchema,
    dob: {
        type: String,
        required: [true, 'Please provide attestee dob'],
    },
    document: {
        type: String,
        required: [true, 'Please provide atteste document'],
    },
    documentId: {
        type: String,
        required: [true, 'Please provide attestee document id'],
    },
    documentType: {
        type: String,
        required: [true, 'Please provide attestee document type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide attestee email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    firstName: {
        type: String,
        required: [true, 'Please provide attestee first name'],
    },
    surname: {
        type: String,
        required: [true, 'Please provide attestee last name'],
    },
    formerName: { type: String },
    otherName: { type: String },
    formerNationality: { type: String },
    nationality: {
        type: String,
        required: [true, 'Please provide attestee nationality'],
    },
    passport: {
        type: String,
        required: [true, 'Please provide attestee passport'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide attestee phone'],
    },
    sex: {
        type: String,
        required: [true, 'Please provide attestee sex'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide attestee signature'],
    },
})

const corporatePartnerSchema = new Schema({
    index: { type: String },
    companyName: {
        type: String,
        required: [true, 'Please provide corporate partner company name'],
    },
    regNumber: {
        type: String,
        required: [true, 'Please provide corporate partner reg number'],
    },
    residentialAddress: addressSchema,
    serviceAddress: addressSchema2,
    authorizedSignatory: authorizedSignatorySchema
})

const individualPartnerSchema = new Schema({
    index: { type: String },
    residentialAddress: addressSchema,
    serviceAddress: addressSchema2,
    dob: {
        type: String,
        required: [true, 'Please provide corporate partner dob'],
    },
    document: {
        type: String,
        required: [true, 'Please provide corporate partner document'],
    },
    documentId: {
        type: String,
        required: [true, 'Please provide corporate partner document id'],
    },
    documentType: {
        type: String,
        required: [true, 'Please provide corporate partner document type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide corporate partner email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    firstName: {
        type: String,
        required: [true, 'Please provide corporate partner first name'],
    },
    surname: {
        type: String,
        required: [true, 'Please provide corporate partner last name'],
    },
    formerName: { type: String },
    otherName: { type: String },
    formerNationality: { type: String },
    nationality: {
        type: String,
        required: [true, 'Please provide corporate partner nationality'],
    },
    occupation: {
        type: String,
        required: [true, 'Please provide corporate partner occupation'],
    },
    passport: {
        type: String,
        required: [true, 'Please provide corporate partner passport'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide corporate partner phone'],
    },
    sex: {
        type: String,
        required: [true, 'Please provide corporate partner sex'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide corporate partner signature'],
    },
})

const minorPartnerSchema = new Schema({
    index: { type: String },
    residentialAddress: addressSchema,
    serviceAddress: addressSchema2,
    attestee: attesteeSchema,
    dob: {
        type: String,
        required: [true, 'Please provide minor partner dob'],
    },
    document: {
        type: String,
        required: [true, 'Please provide minor partner document'],
    },
    documentId: {
        type: String,
        required: [true, 'Please provide minor partner document id'],
    },
    documentType: {
        type: String,
        required: [true, 'Please provide minor partner document type'],
    },
    email: {
        type: String,
        required: [true, 'Please provide minor partner email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    firstName: {
        type: String,
        required: [true, 'Please provide minor partner first name'],
    },
    surname: {
        type: String,
        required: [true, 'Please provide minor partner last name'],
    },
    formerName: { type: String },
    otherName: { type: String },
    formerNationality: { type: String },
    nationality: {
        type: String,
        required: [true, 'Please provide minor partner nationality'],
    },
    passport: {
        type: String,
        required: [true, 'Please provide minor partner passport'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide minor partner phone'],
    },
    sex: {
        type: String,
        required: [true, 'Please provide minor partner sex'],
    },
    signature: {
        type: String,
        required: [true, 'Please provide minor partner signature'],
    },
})



const BusinessRegistrationSchema = new Schema({
    availabilityCode: { type: String },
    businessDescription: {
        type: String,
        required: [true, 'Please provide business desccription'],
    },
    businessName1: {
        type: String,
        required: [true, 'Please provide business name'],
    },
    businessName2: { type: String },
    commencementDate: {
        type: String,
        required: [true, 'Please provide business commencement date'],
    },
    charge: {
        type: String,
        required: [true, 'Please provide service charge'],
    },
    corporatePartners: [corporatePartnerSchema],
    individualPartners: [individualPartnerSchema],
    minorPartners: [minorPartnerSchema],
    natureOfBusiness: {
        type: String,
        required: [true, 'Please provide nature of business'],
    },
    specificNature: {
        type: String,
        required: [true, 'Please provide specific nature of business'],
    },
    placeOfBusiness: placeOfBusinessSchema,
    proprietor: individualPartnerSchema,
    type: {
        type: String,
        required: [true, 'Please provide registration type!'],
    },
    hideAttestee: { type: Boolean },
    hideAuthorizedSignatory: { type: Boolean },
    hideIndividual: { type: Boolean },
    hideMinor: { type: Boolean },
    document: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Please provide business email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
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

}, { collection: 'business_registrations' });

BusinessRegistrationSchema.index({
    'corporateName': 'text',
    'businessName1': 'text',
    'businessName2': 'text',
    'email': 'text'
});

BusinessRegistrationSchema.plugin(mongoosePaginate);



const BusinessRegistration = mongoose.model('BusinessRegistration', BusinessRegistrationSchema);

module.exports = BusinessRegistration;
