const mongoose = require('mongoose');
const { Schema } = mongoose;
const jwt = require('jsonwebtoken')

var UsersSchema = new Schema ({
    username: String,
    password: String,
    googleId: String,
    firstName: String,
    lastName: String,
    photo: String,
    email: String,
})

UsersSchema.statics.generateAccessToken = function (userData){
    return jwt.sign(userData, process.env.TOKEN_SECRET, { expiresIn: '2d' })
}


 
module.exports = mongoose.model('users', UsersSchema);