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
        './Models/Comments',
    ])

    seeder.clearModels([
        'SubmissionStatuses',
        'AdminStatuses',
        'ServiceCategories',
        'Designations',
        'Comments'
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
                'code': 'pending',
                'status': 'Pending'
            },
            {
                'code': 'approved',
                'status': 'Approved'
            },
            {
                'code': 'rejected',
                'status': 'Rejected'
            }
        ]
    },
    {
        'model': 'AdminStatuses',
        'documents': [
            {
                'code': 'unattended',
                'status': 'Unattended'
            },
            {
                'code': 'deployed',
                'status': 'Deployed'
            },
            {
                'code': 'finished',
                'status': 'Finished'
            },
            {
                'code': 'rejected',
                'status': 'Rejected'
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
                'id': '1'
            },
            {
                'code': 'business_reg',
                'category': 'Business Name Registration',
                'description': 'Complete registration process for your business',
                'id': '2'
            },
            {
                'code': 'company_reg',
                'category': 'Company Registration',
                'description': 'Complete registration process for your company',
                'id': '3'
            },
            {
                'code': 'licensing',
                'category': 'Licensing',
                'description': 'Get a License',
                'id': '4'
            },
        ]
    },
    {
        'model': 'Designations',
        'documents': [
            {
                'name': 'Corporate affairs commission',
                'code': 'cac',
            }
        ]
    },
    {
        'model': 'Comments',
        'documents': [
            {
                'title': 'New Reservation Created',
            },
            {
                'title': 'Reservation Deployed',
            },
            {
                'title': 'Reservation Completed',
            },
            {
                'title': 'Reservation Rejected',
            },
            {
                'title': 'New Business Registration Created',
            },
            {
                'title': 'Business Registration Deployed',
            },
            {
                'title': 'Business Registration Completed',
            },
            {
                'title': 'Business Registration  Rejected',
            },
            {
                'title': 'New Company Registration Created',
            },
            {
                'title': 'Company Registration Deployed',
            },
            {
                'title': 'Company Registration Completed',
            },
            {
                'title': 'Company Registration  Rejected',
            },
        ]
    },
]

