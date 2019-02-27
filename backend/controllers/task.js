const Task = require('../models/task')
const mongoose = require('mongoose')
const { check } = require('express-validator/check')


module.exports = {

    //find all
    async findAll(req, res, next) {
        const tasks = await Task.find({ user: req.userData._id })

        return res.status(200).json({
            message: 'Obecne zadania.',
            tasks
        })

    },

    //create
    async create(req, res, next) {
        const task = await Task({
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
        const task = await Task.findOne({ _id: req.params.id })

        task.name = req.body.name
        task.term = req.body.term

        await task.save()

        return res.status(200).json({
            message: 'Zaktualizowano zadanie.'
        })
    },

    //delete
    async delete(req, res, next) {
        await Task.deleteOne({ _id: req.params.id })
        
        return res.status(200).json({
            message: 'Usunięto zadanie.'
        })
    }
}

module.exports.validateTask = [
    check('name')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Podaj treść zadania.'),

    check('name')
        .trim()
        .isLength({ max: 50 })
        .withMessage('Za długa treść zadania.'),

    check('term')
        .optional()
        .isNumeric()
        .withMessage('Zły format czasu.')
]

module.exports.validateTaskIsExist = [
    check('id')
        .custom(async value => {
            return await Task.findOne({ _id: value }).select('_id') ? true : false
        })
        .withMessage('Zadanie nie istnieje.')
]