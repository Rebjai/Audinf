const Router = require('express').Router()

Router.use('/user', require('./user'))
Router.use('/teacher', require('./teacher'))
Router.use('/support', require('./support'))
Router.use('/task', require('./task'))

module.exports = Router