const dbConn = require("../config/mongo.config")
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var EmployeeSchema = new Schema ({
    FirstName: String,
    LastName: String,
    Title: String,
    PhotoPath: String
})

module.exports = mongoose.model('employees', EmployeeSchema)