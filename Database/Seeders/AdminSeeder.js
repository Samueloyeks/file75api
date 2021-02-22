const mongoose = require('mongoose');
const ObjectId =  mongoose.Types.ObjectId;

exports.admins = [
    {
        "role": "super-admin",
        "designations": ["cac"],
        "active": true,
        "user": ObjectId("5f8f0bc011679030853cac49"),
        "LastAssignmentDate": new Date("2020-10-20T16:09:36.989Z"),
        "created_at": new Date( "2020-10-20T16:09:36.989Z"),
        "__v": 0
    },
    {
        "role": "admin",
        "designations": ["cac"],
        "active": true,
        "user": ObjectId("5f8f0bfd2f1c763095b72bfb"),
        "LastAssignmentDate": new Date("2021-02-22T13:37:37.358Z"),
        "created_at": new Date("2020-10-20T16:10:38.567Z"),
        "__v": 0
    }
] 