const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true);

const User = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String,  required: true, unique: true},
    password: {type: String, required: true},
    name: String,
    area: {type:String, required: true},
    semester: Number,
}, {
    timestamps: true
})

module.exports = mongoose.model('user', User)