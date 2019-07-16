const mongoose = require('mongoose')

const lab = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: {type: Number, required: true },
    name: {type: String, required: true },
    docente: {type: mongoose.Schema.Types.ObjectId, ref: 'teacher'},
    subject: String
}, {
    timestamps: true
})

module.exports = mongoose.model('lab', lab)