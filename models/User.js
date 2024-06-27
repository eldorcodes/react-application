const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullname:String,
    nationality:String,
    address:String,
    phone:Number,
    email:String,
    date:Date
})

module.exports = mongoose.model('JobApplications',userSchema);