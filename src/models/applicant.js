const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/my-blog');
const Schema = mongoose.Schema;


const applicantSchema = new Schema({
   fullname : String,
    email: String,
    mobileno:String,
    jobtype:String,
    preferedlocation:String,
    DOB:String,

});

const applicantModel = mongoose.model('applicant',applicantSchema);

module.exports = applicantModel;
