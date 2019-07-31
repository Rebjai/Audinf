const groupController = require('../controllers/group')
const logController = require('../controllers/log')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required

// Router.post('/login',
//     groupController.validateLogin,
//     // error.catchAsync(logController.makeReport),
//     error.checkValidation,
//     error.catchAsync(groupController.login))


Router.post('/register',
    groupController.validateRegister,
    error.checkValidation,
    error.catchAsync(groupController.register))

    Router.post('/:id',
    groupController.findSem)
    Router.get('/',
    groupController.getAll)
module.exports = Router