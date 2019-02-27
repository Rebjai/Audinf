const mongoose = require('mongoose')

const Task = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: mongoose.Schema.Types.ObjectId,
    name: String,
    term: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('task', Task)