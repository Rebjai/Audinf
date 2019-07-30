const mongoose = require('mongoose')

const group = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    semester: {type: Number, required: true},
    area: {type: String}
}, {
    timestamps: true
})

module.exports = mongoose.model('group', group)