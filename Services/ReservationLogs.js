const ReservationLog = require('../Models/ReservationLog');
const factory = require('../Helpers/handlerFactory');



exports.createLog = async (req) => {
  return await ReservationLog.create({
    reservation: req.reservation,
    comment: req.comment,
    user: req.user,
    admin: req.admin,
  });
};

exports.getLogDefault = factory.getOne(ReservationLog);

exports.getLog = async (params) => {
  const query = ReservationLog.findOne(params);
  return await query;
};


