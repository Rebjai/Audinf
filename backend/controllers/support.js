const Support = require('../models/support')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { check, oneOf } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants.json')


module.exports = {
    async register(req, res, next) {

        bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
            if (err) next(err)

            const user = await new Support({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                password: encrypted,
                name: req.body.name,
                semester: req.body.semester
            }).save()


            return res.json({
                message: 'Succesful register.'
            })
        })

    },

    async login(req, res, next) {

        //basic user data (id, username)
        const data = await Support.findOne({ username: req.body.username })
        console.log(data);

        const token = await jwt.sign(
            {
                _id: data._id,
                username: data.username,
            },
            JWT_SECRET,
            {
                expiresIn: 3600 //(seconds) 60 mins
            }
        )

        return res.status(200).json({
            message: 'Acceso Permitido',
            token,
            name: data.name,
            semester: data.semester,
        })

    }
}

module.exports.validateRegister = [
    check('username')
        .trim()
        .isLength({ min: 5, max: 16 })
        .withMessage("Username should be 8 characters")

        .isAlphanumeric()
        .withMessage("The username can only contain letters and numbers.")

        .custom(async value => await Support.findOne({ username: value }) == null)
        .withMessage("Can't find the user"),

    check('password')
        .isLength({ min: 4, max: 15 })
        .withMessage("Password must be 4 characters long"),

    check('passwordConfirmation')
        .custom((value, { req }) => value == req.body.password)
        .withMessage("Passwords must be the same")
]

module.exports.validateLogin = [
    check('password')
        .custom(async (value, { req }) => {
            const { password } = await Support.findOne({ username: req.body.username }).select('password')
            //If password doesn't exist (that's means that user also doesn't exist) return false
            if (!password.length > 1) return resolve(false)

            return await new Promise((resolve, reject) => {
                bcrypt.compare(
                    req.body.password,
                    password,
                    (err, same) => {
                        if (err) reject(err)
                        resolve(same)
                    }
                )
            })
        })
        .withMessage("Incorrect username or password.")
]