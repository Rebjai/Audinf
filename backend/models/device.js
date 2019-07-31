const mongoose = require('mongoose')

const device = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ip: {type: String, required: true },
    room: {type: Number, required: true },
    name: String,
    status: {type: Number, default: 0}
}, {
    timestamps: true
})

module.exports = mongoose.model('device', device)