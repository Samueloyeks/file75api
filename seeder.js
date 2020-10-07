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
        './Models/ServiceCategories'
    ])

    seeder.clearModels([
        'SubmissionStatuses',
        'ServiceCategories'
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
        'model': 'ServiceCategories',
        'documents': [
            {
                'code': 'name_rsv',
                'category': 'Name Reservation',
                'description': 'Reserve your business name',
            },
            {
                'code': 'bus_reg',
                'category': 'Business Registration',
                'description': 'Complete registration process for your business',
            },
            {
                'code': 'comp_reg',
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
]

