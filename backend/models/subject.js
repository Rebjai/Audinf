const mongoose = require('mongoose')
// const group = require('./group')

const subject = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true },
    
}, {
    timestamps: true
})
// module.exports = subject
module.exports = mongoose.model('subject', subject)