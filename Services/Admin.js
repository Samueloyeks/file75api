const Admin = require('../Models/Admin');

exports.createAdmin = async (req) => {
  return await Admin.create({
    user: req.user,
    role: req.body.role,
    designations: req.body.designations,
  });
};

exports.getOne = async (id, byUser, popOptions) => {
  let params;

  if (byUser === true) { 
    params = { user: id };
  } else {
    params = { _id: id };
  }
  let query = Admin.findOne(params);
  if (popOptions) query = query.populate(popOptions);
  return await query;
};


exports.updateAssignment = async (id) => {
  return await Admin.findOneAndUpdate(
    { _id: id },
    {
      LastAssignmentDate: Date.now(),
    },
    {useFindAndModify: false}
  );
};

exports.getNextAdmin = async () => {
  let query = Admin.findOne({ role: 'admin' }, {}, { sort: { 'LastAssignmentDate': 1 } });

  return await query;
};
