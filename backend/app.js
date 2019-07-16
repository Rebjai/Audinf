const express = require('express')
    , bodyParser = require('body-parser')
    , cors = require('cors')
    , mongoose = require('mongoose')
    , error = require('./middlewares/error')
    , { DB_NAME, USER_NAME, PASSWORD, CLUSTER } = require('./constants.json')

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose.connect(`mongodb+srv://${USER_NAME}:${PASSWORD}@${CLUSTER}.mongodb.net/${DB_NAME}`, {
    mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`,{
    useNewUrlParser: true
})

app.use('/api', require('./routes/index'))
app.use(error.notFound)
app.use(error.catchError)

module.exports = app