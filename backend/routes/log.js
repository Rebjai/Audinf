const logController = require('../controllers/log')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required


Router.put('/logout',
    logController.logout
)

Router.post('/login',
    logController.makeReport,
    error.checkValidation,
    error.catchAsync(logController.login))
Router.post('/endDate',
    logController.makeReport,
    error.checkValidation,
    error.catchAsync(logController.login))
Router.put('/:id',
    logController.update)
Router.get('/',
    logController.findAll)

Router.post('/register',
    logController.validateRegister,
    error.checkValidation,
    error.catchAsync(logController.register))

module.exports = Router