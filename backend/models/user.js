const mongoose = require('mongoose')

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    password: {type: String, required: true},
    name: String,
    semester: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('user', User)