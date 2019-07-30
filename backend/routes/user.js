const userController = require('../controllers/user')
const logController = require('../controllers/log')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required

Router.post('/login',
    userController.validateLogin,
    // error.catchAsync(logController.makeReport),
    error.checkValidation,
    error.catchAsync(userController.login))

Router.post('/register',
    userController.validateRegister,
    error.checkValidation,
    error.catchAsync(userController.register))

module.exports = Router