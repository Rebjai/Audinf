const supportController = require('../controllers/support')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required

Router.post('/login',
    supportController.validateLogin,
    error.checkValidation,
    error.catchAsync(supportController.login))

Router.post('/register',
    supportController.validateRegister,
    error.checkValidation,
    error.catchAsync(supportController.register))

Router.post('/login2',
    supportController.validateLogin,
    error.checkValidation,
    error.catchAsync(supportController.login))

module.exports = Router