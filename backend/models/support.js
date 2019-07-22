const mongoose = require('mongoose')

const support = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true },
    password: {type: String, required: true },
    name: String,
}, {
    timestamps: true
})

module.exports = mongoose.model('support', support)