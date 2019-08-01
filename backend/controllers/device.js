const Device = require('../models/device')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { check, oneOf } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants.json')


module.exports = {
    async findAll(req, res, next){
        console.log("regging");
        
        // const groups = await Teacher.find({ semester: req.params.id , area: req.body.area})
        const devices = await Device.find()
        console.log("req", req);
        
        return res.status(200).json({
            message: 'encontrado',
            devices
        })

    },
    async register(req, res, next) {

        // bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
            // if (err) next(err)

            const user = await new Device({
                _id: mongoose.Types.ObjectId(),
                ip: req.body.ip,
                room: req.body.room,
                name: req.body.name,
            }).save()


            return res.json({
                message: 'Succesful register.'
            })
        // })

    },

    async login(req, res, next) {

        //basic user data (id, username)
        const data = await Device.findOne({ username: req.body.username })
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
    check('ip')
        .trim()
        .isLength({ min: 5, max: 28 })
        .withMessage("Username should be 5 >  < 28 characters")

        .not().isAlphanumeric()
        .withMessage("The username can only contain letters and numbers.")

        .custom(async value => await Device.findOne({ ip: value }) == null)
        .withMessage("ya se registró esa ip"),

    check('room')
        .isAlphanumeric()
        .withMessage("room should be a number"),

    
]

module.exports.validateLogin = [
    check('password')
        .custom(async (value, { req }) => {
            const { password } = await Device.findOne({ username: req.body.username }).select('password')
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