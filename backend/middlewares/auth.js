const { check } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants.json')

exports.verifyToken = (req, res, next) => {
    
    try {
        const decoded = jwt.verify(req.headers.authorization, JWT_SECRET)
        req.userData = decoded
    }
    catch(err) {
        return res.status(400).json({
            message: "Session error",
            isLogged: false
        })
    }

    next()
}