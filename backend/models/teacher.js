const mongoose = require('mongoose')

const teacher = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true },
    password: {type: String, required: true },
    name: String,
    subjects: [{name: String}],
}, {
    timestamps: true
})

module.exports = mongoose.model('teacher', teacher)