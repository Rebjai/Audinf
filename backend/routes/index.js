const Router = require('express').Router()

Router.use('/user', require('./user'))
Router.use('/task', require('./task'))

module.exports = Router