const express = require('express')
const studentsRouter = express.Router()

const StudentsController = require('../../controllers/student.controller.js')

studentsRouter.get('/list', StudentsController.list)
studentsRouter.get('/find/:cpf', StudentsController.find)
studentsRouter.get('/search/:filter', StudentsController.search)

studentsRouter.post('/insert', StudentsController.insert)

studentsRouter.put('/update/:cpf', StudentsController.update)

studentsRouter.delete('/delete/:cpf', StudentsController.delete)

module.exports = studentsRouter
