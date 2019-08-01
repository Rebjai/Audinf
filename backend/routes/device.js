const deviceController = require('../controllers/device')
const error = require('../middlewares/error')
const Router = require('express').Router()
//Check auth - required

Router.get('/', deviceController.findAll)

Router.post('/login',
    deviceController.validateLogin,
    error.checkValidation,
    error.catchAsync(deviceController.login))

Router.post('/register',
    deviceController.validateRegister,
    error.checkValidation,
    error.catchAsync(deviceController.register))


module.exports = Router