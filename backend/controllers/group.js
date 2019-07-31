const Group = require('../models/group')
const mongoose = require('mongoose')
const { check } = require('express-validator/check')


module.exports = {
    sayHi(){
        console.log("hi group");
        
    },
    async register(req, res, next) {
        console.log("regging", req.body);
        

        

            const user = await new Group({
                _id: mongoose.Types.ObjectId(),
                area: req.body.area,
                name: req.body.name,
                semester: req.body.semester
            }).save()


            return res.json({
                message: 'Succesful register.'
            })
        

    },
    //update
    async update(req, res, next) {
        const task = await Group.find({ semester: req.params.semester })

        

        // await task.save()

        return res.status(200).json({
            task
        })
    },
    async getAll(req, res, next) {
        
        
        const groups = await Group.find()
        console.log("grupos",groups);


        
        return res.status(200).json({
            message: 'encontrado',
            groups
        })

    },

    //find all
    async findSem(req, res, next) {
        
        console.log("params",req.params);
        console.log("body",req.body);
        const groups = await Group.find({ semester: req.params.id , area: req.body.area})
        console.log("grupos",groups);


        
        return res.status(200).json({
            message: 'encontrado',
            groups
        })

    },
    

    //create
    async create(req, res, next) {
        const task = await Group({
            _id: mongoose.Types.ObjectId(),
            user: req.userData._id,
            name: req.body.name,
            term: req.body.term
        }).save()

        return res.status(201).json({ 
            message: 'Utworzono nowe zadanie.',
            task: {
                _id: task._id,
                name: task.name,
                term: task.term
            }
        })
    },

    //update
    async update(req, res, next) {
        const task = await Group.findOne({ _id: req.params.id })

        task.name = req.body.name
        task.term = req.body.term

        await task.save()

        return res.status(200).json({
            message: 'Actualizado.'
        })
    },

    //delete
    async delete(req, res, next) {
        await Group.deleteOne({ _id: req.params.id })
        
        return res.status(200).json({
            message: 'Usunięto zadanie.'
        })
    }
}

module.exports.validateTask = [
    check('semester')
        .isNumeric()
        .withMessage('semestre debe ser numero.'),

    // check('area')
    //     .trim()
    //     .isLength({ max: 100 })
    //     .withMessage('Za długa treść zadania. (max. 100 znaków)')
]
module.exports.validateRegister = [
    check('name')
        .trim()
        .isLength({ min: 3, max:5  })
        .withMessage('nombre 3 > && < 5'),

]

module.exports.validateTaskIsExist = [
    check('id')
        .custom(async value => {
            return await Group.find({ semester: value }).select('_id') ? true : false
        })
        .withMessage('no existe grupo.')
]