const mongoose = require('mongoose')
const user = require('./user')

const log = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'teacher'},
    device: {type: mongoose.Schema.Types.ObjectId, ref: 'device'},
    lab: {type: mongoose.Schema.Types.ObjectId, ref: 'lab'},
    comments: {type: mongoose.Schema.Types.ObjectId, ref: 'task'},
}, {
    timestamps: true
})

module.exports = mongoose.model('log', log)