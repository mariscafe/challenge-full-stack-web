const Router = require('express')
const Students = require('../../controllers/student.controller.js')

const studentsRouter = Router()

// Get Students
studentsRouter.get('/list', async (req, res) => {
  Students.list(req, res)
})

studentsRouter.get('/find/:cpf', async (req, res) => {
  Students.find(req, res)
})

studentsRouter.get('/search/:filter', async (req, res) => {
  Students.search(req, res)
})

// Add Student
studentsRouter.post('/insert', async (req, res) => {
  Students.insert(req, res)
})

// Update Student
studentsRouter.put('/update/:cpf', async (req, res) => {
  Students.update(req, res)
})

// Delete Student
studentsRouter.delete('/delete/:cpf', async (req, res) => {
  Students.delete(req, res)
})

module.exports = studentsRouter
