const mongoose = require('mongoose')

const Tech = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    name: String,
    term: {
        type: String,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('task', Tech)