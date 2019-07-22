const mongoose = require('mongoose')
const group = require('group')

const subject = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    group: group
}, {
    timestamps: true
})

module.exports = mongoose.model('subject', subject)