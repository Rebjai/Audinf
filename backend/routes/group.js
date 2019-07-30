const Router = require('express').Router()
const taskController = require('../controllers/group')
const error = require('../middlewares/error')
const auth = require('../middlewares/auth')

Router.get('/',
    auth.verifyToken,
    error.catchAsync(taskController.findAll))
Router.post('/:semester',
    auth.verifyToken,
    taskController.validateTaskIsExist,
    taskController.validateTask,
    error.catchAsync(taskController.findAll))

Router.post('/register',
    taskController.validateRegister,
    error.checkValidation,
    error.catchAsync(taskController.register))

Router.post('/',
    auth.verifyToken,
    taskController.validateTask,
    error.checkValidation,
    error.catchAsync(taskController.create))

Router.put('/:id',
    auth.verifyToken,
    taskController.validateTaskIsExist,
    taskController.validateTask,
    error.checkValidation,
    error.catchAsync(taskController.update))

Router.delete('/:id',
    auth.verifyToken,
    taskController.validateTaskIsExist,
    error.checkValidation,
    error.catchAsync(taskController.delete))

module.exports = Router