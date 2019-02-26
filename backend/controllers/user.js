const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { check, oneOf } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants.json')


module.exports = {
    async register(req, res, next) {

        bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
            if(err) next(err)

            const user = await new User({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                password: encrypted
            }).save()


            return res.json({
                message: 'Pomyślnie zarejestrowano.'
            })
        })

    },

    async login(req, res, next) {

        //basic user data (id, username)
        const data = await User.findOne({ username: req.body.username }).select('username')
        const token = await jwt.sign(
            {
                _id: data._id,
                username: data.username
            },
            JWT_SECRET,
            {
                expiresIn: 20
            }
        )
        
        return res.status(200).json({
            message: 'Pomyślnie zalogowano',
            token
        })

    }
}

module.exports.validateRegister = [
    check('username')
        .trim()
        .isLength({ min: 5, max: 16 })
        .withMessage("Nazwa użytkownika powinna zawierać od 5 do 16 znaków.")
    
        .isAlphanumeric()
        .withMessage("Nazwa użytkownika może zawierać tylko litery i liczby.")

        .custom(async value => await User.findOne({ username: value }) == null)
        .withMessage("Nazwa użytkownika jest zajęta."),
    
    check('password')
        .isLength({ min: 8, max: 15 })
        .withMessage("Hasło musi posiadać długość od 8 do 15 znaków."),
    
    check('passwordConfirmation')
        .custom((value, {req}) => value == req.body.password)
        .withMessage("Hasła muszą być takie same.")
]

module.exports.validateLogin = [
    check('password')
        .custom(async (value, {req}) => {
            const {password} = await User.findOne({ username: req.body.username }).select('password')
            //If password doesn't exist (that's means that user also doesn't exist) return false
            if(!password.length > 1) return resolve(false)

            return await new Promise((resolve, reject) => {
                bcrypt.compare(
                    req.body.password,
                    password,
                    (err, same) => {
                        if(err) reject(err)
                        resolve(same)
                    }
                )
            })
        })
        .withMessage("Niepoprawna nazwa użytkownika lub hasło.")
]