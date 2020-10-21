const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');


const adminSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  role: {
    type: String,
    enum: ['super-admin','admin', 'level-4', 'level-3', "level-2", "level-1", "level-0"],
    default: 'super-admin',
  },
  designations: {
    type: [String],
    enum: ['cac']
  },
  LastAssignmentDate: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
adminSchema.plugin(mongoosePaginate);


const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
