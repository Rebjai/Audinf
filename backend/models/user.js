const mongoose = require('mongoose')

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    password: String
}, {
    timestamps: true
})

module.exports = mongoose.model('user', User)