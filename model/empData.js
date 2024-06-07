const mongoose = require('mongoose')
const empSchema = mongoose.Schema({
    eName:String,
    eLocation:String,
    ePosition:String,
    eSalary:Number
})
const empData = mongoose.model('Employee',empSchema)
module.exports = empData