const teacherController = require('../controllers/teacher')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required

Router.post('/login',
    teacherController.validateLogin,
    error.checkValidation,
    error.catchAsync(teacherController.login))

Router.post('/register',
    teacherController.validateRegister,
    error.checkValidation,
    error.catchAsync(teacherController.register))

Router.post('/login2',
    teacherController.validateLogin,
    error.checkValidation,
    error.catchAsync(teacherController.login))

module.exports = Router