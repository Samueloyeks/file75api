const seeder = require('mongoose-seed');
const dotenv = require('dotenv');



dotenv.config({ path: './config.env' });

let DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);
DB = DB.replace('<dbname>', process.env.DATABASE_NAME);

seeder.connect(DB, () => {
    seeder.loadModels([
        './Models/SubmissionStatuses',
        './Models/AdminStatuses',
        './Models/ServiceCategories',
        './Models/Designations',
    ])

    seeder.clearModels([
        'SubmissionStatuses',
        'AdminStatuses',
        'ServiceCategories',
        'Designations'
    ], () => {

        seeder.populateModels(data, (err, done) => {
            if (err) {
                return console.log('seed err', done)
            }

            if (done) {
                return console.log('database seeded', done)
            }

            seeder.disconnect();
        })
    })
})

const data = [
    {
        'model': 'SubmissionStatuses',
        'documents': [
            {
                'code':'pending',
                'status': 'Pending'
            },
            {
                'code':'approved',
                'status': 'Approved'
            },
            {
                'code':'rejected',
                'status': 'Rejected'
            }
        ]
    },
    {
        'model': 'AdminStatuses',
        'documents': [
            {
                'code':'unattended',
                'status': 'Unattended'
            },
            {
                'code':'deployed',
                'status': 'Deployed'
            },
            {
                'code':'finished',
                'status': 'Finished'
            }
        ]
    },
    {
        'model': 'ServiceCategories',
        'documents': [
            {
                'code': 'name_rsv',
                'category': 'Name Reservation',
                'description': 'Reserve your business name',
            },
            {
                'code': 'business_reg',
                'category': 'Business Registration',
                'description': 'Complete registration process for your business',
            },
            {
                'code': 'company_reg',
                'category': 'Company Registration',
                'description': 'Complete registration process for your company',
            },
            {
                'code': 'licensing',
                'category': 'Licensing',
                'description': 'Get a License',
            },
        ]
    },
    {
        'model': 'Designations',
        'documents': [
            {
                'name':'Corporate affairs commission',
                'code':'cac',
            }
        ]
    },
]

