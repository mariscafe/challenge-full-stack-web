const Router = require('express')
const Students = require('../../controllers/student.controller.js')

const studentsRouter = Router()

// Get Students
studentsRouter.get('/list', Students.list)

studentsRouter.get('/find/:cpf', Students.find)

studentsRouter.get('/search/:filter', Students.search)

// Add Student
studentsRouter.post('/insert', Students.insert)

// Update Student
studentsRouter.put('/update/:cpf', Students.update)

// Delete Student
studentsRouter.delete('/delete/:cpf', Students.delete)

module.exports = studentsRouter
