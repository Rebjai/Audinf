const userController = require('../controllers/user')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required

Router.post('/login',
    userController.validateLogin,
    error.checkValidation,
    error.catchAsync(userController.login))

Router.post('/register',
    userController.validateRegister,
    error.checkValidation,
    error.catchAsync(userController.register))

Router.post('/login2',
    userController.validateLogin,
    error.checkValidation,
    error.catchAsync(userController.login))

module.exports = Router