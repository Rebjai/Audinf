const Log = require('../models/log')
const Group = require('../models/group')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { check, oneOf } = require('express-validator/check')
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../constants.json')


module.exports = {
    async findAll(req, res, next){
        // const groups = await Teacher.find({ semester: req.params.id , area: req.body.area})
        const logs = await Log.find()
        return res.status(200).json({
            message: 'encontrado',
            logs
        })

    },
    async update(req, res, next) {
        console.log("searching:", req.params);
        
        const log = await Log.findOne({ _id: req.params.id })

        if (req.body.stack) {
            log.stack = req.body.stack
            console.log("updated stack");
            
            
        }
        if (req.body.group) {
            log.group = req.body.group
            console.log("updated group");
        }
        if (req.body.teacher ){
            log.teacher = req.body.teacher
            console.log("updated teacher");
        }
        if (req.body.comments) {
            log.comments = req.body.comments
            console.log("updated comments");
        }

        await log.save()

        return res.status(200).json({
            message: 'Updated log.'
        })
    },
    async makeReport(req, res, next) {
        console.log("making report", req.body);
        // console.log(res,next);


        const report = await new Log({
            _id: mongoose.Types.ObjectId(),
            user: req.body.username,
            device: req.body.deviceIP,
            group: { type: mongoose.Schema.Types.ObjectId },

        }).save()
        console.log(report);

        return res.json({
            message: 'Succesful register.'
        })


    },
    async logout(req, res, next) {
        console.log("este es el log de req", req.body);
        let now = Date()
        console.log("and now........................................................",now);
        const cls = await Group.findOne({semester: req.body.semester})
        if (cls) {
            console.log("found");
            
            
        }else{
            console.log("not found");
            
        }

        const log = await Log.findOne({ _id: req.body.logID }, (err, found) => {
            if (err) {
                console.log(err);
                res.status(500).send()

            } else {
                found.endDate = Date()
                found.save((err, updated) => {
                    if (err) {
                        console.log(err);
                        res.status(500).send()
                    } else {
                        console.log(updated);
                        res.send(updated)
                        
                        
                    }
                })

            }

        })
        // console.log(log);



    },


    async register(req, res, next) {

        bcrypt.hash(req.body.password, 10, async (err, encrypted) => {
            if (err) next(err)

            const user = await new Log({
                _id: mongoose.Types.ObjectId(),
                username: req.body.username,
                password: encrypted,
                name: req.body.name,
                semester: req.body.semester
            }).save()


            return res.status(200).json({
                message: 'Succesful register.'
            })
        })

    },

    async login(req, res, next) {

        //basic user data (id, username)
        const data = await Log.findOne({ username: req.body.username })
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

        .custom(async value => await Log.findOne({ username: value }) == null)
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
            const { password } = await Log.findOne({ username: req.body.username }).select('password')
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