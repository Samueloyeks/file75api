const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const compression = require('compression');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./Controllers/Error/LoadController');
const authRouter = require('./Routes/Auth');
const adminRouter = require('./Routes/Admin');
const ReservationRouter = require('./Routes/Reservations');
const BusinessRegistrationRouter = require('./Routes/BusinessRegistration');
const CompanyRegistrationRouter = require('./Routes/CompanyRegistration');
const ServiceCategoryRouter = require('./Routes/ServiceCategories');
const BusinessObjectRouter = require('./Routes/BusinessObjects');
const CompanyNatureOfBusinessRouter = require('./Routes/CompanyNaturesOfBusiness');
const BusinessNatureOfBusinessRouter = require('./Routes/BusinessNaturesOfBusiness');
const ArticlesOfAssociationRouter = require('./Routes/ArticlesOfAssociation');
const FeedbackEmailRouter = require('./Routes/FeedbackEmails');
const FaqRouter = require('./Routes/Faq');
const UploadsRouter = require('./Routes/Uploads');






const app = express();

app.enable('trust proxy');

app.use(
  cors()
);
app.use(fileUpload());

// 1) GLOBAL MIDDLEWARE
// Set security HTTP headers
app.use(helmet());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '50mb' }));


// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: ['reference'],
  })
);

// Serving static files
app.use(express.static(`${__dirname}/public`));

app.use(compression());

// Test middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes
app.use('/', authRouter); 
app.get('/_ah/start', authRouter) 
app.use('/api/v1', authRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/reservation', ReservationRouter);
app.use('/api/v1/businessReg', BusinessRegistrationRouter);
app.use('/api/v1/companyReg', CompanyRegistrationRouter);
app.use('/api/v1/services', ServiceCategoryRouter);
app.use('/api/v1/uploads', UploadsRouter);
app.use('/api/v1/businessObjects', BusinessObjectRouter);
app.use('/api/v1/companyNaturesOfBusiness', CompanyNatureOfBusinessRouter);
app.use('/api/v1/businessNaturesOfBusiness', BusinessNatureOfBusinessRouter);
app.use('/api/v1/article', ArticlesOfAssociationRouter);
app.use('/api/v1/feedback', FeedbackEmailRouter);
app.use('/api/v1/faq', FaqRouter);



app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
