const mongoose = require('mongoose')
const user = require('./user')

const log = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    teacher: {type: mongoose.Schema.Types.ObjectId, ref: 'teacher'},
    device: {type: String},
    lab: {type: mongoose.Schema.Types.ObjectId, ref: 'lab'},
    comments: {type: mongoose.Schema.Types.ObjectId, ref: 'task'},
    group:{type: mongoose.Schema.Types.ObjectId},
    endDate: {type: Date},
    stack: [String],
}, {
    timestamps: true
})

module.exports = mongoose.model('log', log)