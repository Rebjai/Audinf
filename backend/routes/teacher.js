const teacherController = require('../controllers/teacher')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required

Router.post('/login',
    teacherController.validateLogin,
    error.checkValidation,
    error.catchAsync(teacherController.login))
Router.get('/',
    teacherController.findAll)

Router.post('/register',
    teacherController.validateRegister,
    error.checkValidation,
    error.catchAsync(teacherController.register))

module.exports = Router