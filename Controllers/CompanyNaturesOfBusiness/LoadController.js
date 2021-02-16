const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');
const CompanyNaturesOfBusinessService = require('../../Services/CompanyNaturesOfBusiness');



exports.getCompanyNatureOfBusiness= catchAsync(async (req, res, next) => {
  const result = await CompanyNaturesOfBusinessService.getAllCompanyNaturesOfBusiness(req);

  return res.status(200).json({
    status: 'success',
    data: {
      result
    },
  });
});




